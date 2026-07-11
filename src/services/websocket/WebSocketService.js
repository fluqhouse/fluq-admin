/**
 * ==========================================================================
 * GENERIC WEBSOCKET SERVICE
 * ==========================================================================
 * A pluggable WebSocket service using Socket.io that other features can use.
 * Supports plugins for different features (chat, notifications, etc.)
 */

import { io } from "socket.io-client";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.plugins = new Map();
    this.eventHandlers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.token = null;
  }

  /**
   * Connect to the WebSocket server
   * @param {string} token - JWT access token for authentication
   * @returns {Promise<void>}
   */
  connect(token) {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      this.token = token;
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      this.socket = io(baseUrl, {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
        reconnectionDelayMax: 5000,
      });

      this.socket.on("connect", () => {
        console.log("[WebSocket] Connected:", this.socket.id);
        this.isConnected = true;
        this.reconnectAttempts = 0;

        // Notify all plugins of connection
        this.plugins.forEach((plugin) => {
          if (plugin.onConnect) {
            plugin.onConnect(this.socket);
          }
        });

        resolve();
      });

      this.socket.on("disconnect", (reason) => {
        console.log("[WebSocket] Disconnected:", reason);
        this.isConnected = false;

        // Notify all plugins of disconnection
        this.plugins.forEach((plugin) => {
          if (plugin.onDisconnect) {
            plugin.onDisconnect(reason);
          }
        });
      });

      this.socket.on("connect_error", (error) => {
        console.error("[WebSocket] Connection error:", error.message);
        this.reconnectAttempts++;

        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          reject(new Error("Max reconnection attempts reached"));
        }
      });

      this.socket.on("error", (error) => {
        console.error("[WebSocket] Error:", error);

        // Notify all plugins of error
        this.plugins.forEach((plugin) => {
          if (plugin.onError) {
            plugin.onError(error);
          }
        });
      });

      // Set timeout for initial connection
      setTimeout(() => {
        if (!this.socket?.connected) {
          reject(new Error("Connection timeout"));
        }
      }, 10000);
    });
  }

  /**
   * Disconnect from the WebSocket server
   */
  disconnect() {
    if (this.socket) {
      // Notify plugins before disconnecting
      this.plugins.forEach((plugin) => {
        if (plugin.onDisconnect) {
          plugin.onDisconnect("manual");
        }
      });

      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.token = null;
      console.log("[WebSocket] Manually disconnected");
    }
  }

  /**
   * Check if connected
   * @returns {boolean}
   */
  getConnectionStatus() {
    return this.isConnected && this.socket?.connected;
  }

  /**
   * Subscribe to a socket event
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  subscribe(event, handler) {
    if (!this.socket) {
      console.warn("[WebSocket] Cannot subscribe, socket not initialized");
      return;
    }

    // Track handlers for cleanup
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event).add(handler);

    this.socket.on(event, handler);
  }

  /**
   * Unsubscribe from a socket event
   * @param {string} event - Event name
   * @param {Function} handler - Event handler to remove
   */
  unsubscribe(event, handler) {
    if (!this.socket) return;

    this.socket.off(event, handler);

    // Remove from tracking
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).delete(handler);
    }
  }

  /**
   * Unsubscribe all handlers for an event
   * @param {string} event - Event name
   */
  unsubscribeAll(event) {
    if (!this.socket) return;

    this.socket.off(event);
    this.eventHandlers.delete(event);
  }

  /**
   * Emit an event to the server
   * @param {string} event - Event name
   * @param {any} data - Data to send
   */
  emit(event, data) {
    if (!this.socket?.connected) {
      console.warn("[WebSocket] Cannot emit, not connected");
      return false;
    }

    this.socket.emit(event, data);
    return true;
  }

  /**
   * Emit an event and wait for acknowledgement
   * @param {string} event - Event name
   * @param {any} data - Data to send
   * @param {number} timeout - Timeout in ms
   * @returns {Promise<any>}
   */
  emitWithAck(event, data, timeout = 5000) {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error("Not connected"));
        return;
      }

      const timer = setTimeout(() => {
        reject(new Error("Acknowledgement timeout"));
      }, timeout);

      this.socket.emit(event, data, (response) => {
        clearTimeout(timer);
        resolve(response);
      });
    });
  }

  /**
   * Register a plugin
   * @param {Object} plugin - Plugin object
   * @param {string} plugin.name - Unique plugin name
   * @param {string[]} plugin.events - Events this plugin handles
   * @param {Function} plugin.onConnect - Called when socket connects
   * @param {Function} plugin.onDisconnect - Called when socket disconnects
   * @param {Function} plugin.onError - Called on socket errors
   */
  registerPlugin(plugin) {
    if (!plugin.name) {
      throw new Error("Plugin must have a name");
    }

    if (this.plugins.has(plugin.name)) {
      console.warn(`[WebSocket] Plugin "${plugin.name}" already registered`);
      return;
    }

    this.plugins.set(plugin.name, plugin);
    console.log(`[WebSocket] Plugin "${plugin.name}" registered`);

    // If already connected, call onConnect immediately
    if (this.isConnected && plugin.onConnect) {
      plugin.onConnect(this.socket);
    }
  }

  /**
   * Unregister a plugin
   * @param {string} pluginName - Name of plugin to remove
   */
  unregisterPlugin(pluginName) {
    const plugin = this.plugins.get(pluginName);
    if (plugin) {
      // Clean up plugin event handlers
      if (plugin.events) {
        plugin.events.forEach((event) => {
          this.unsubscribeAll(event);
        });
      }
      this.plugins.delete(pluginName);
      console.log(`[WebSocket] Plugin "${pluginName}" unregistered`);
    }
  }

  /**
   * Get the raw socket instance
   * @returns {Socket|null}
   */
  getSocket() {
    return this.socket;
  }

  /**
   * Update authentication token
   * @param {string} newToken - New JWT token
   */
  updateToken(newToken) {
    this.token = newToken;
    if (this.socket) {
      this.socket.auth = { token: newToken };
    }
  }

  /**
   * Force reconnect with new token
   * @param {string} token - New JWT token
   */
  async reconnect(token) {
    this.disconnect();
    await this.connect(token);
  }
}

// Export singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;

// Also export the class for testing
export { WebSocketService };
