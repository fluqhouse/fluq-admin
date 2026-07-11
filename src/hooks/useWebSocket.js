/**
 * ==========================================================================
 * WEBSOCKET REACT HOOK
 * ==========================================================================
 * React hook wrapper for the WebSocket service.
 * Handles connection lifecycle with auth context.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import webSocketService from "../services/websocket/WebSocketService";
import { getAccessToken } from "../services/api/axios";
import useAuth from "./useAuth";

/**
 * Hook for using WebSocket in React components
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoConnect - Auto-connect on mount (default: true)
 * @param {Object} options.plugin - Optional plugin to register
 * @returns {Object} WebSocket state and methods
 */
const useWebSocket = (options = {}) => {
  const { autoConnect = true, plugin = null } = options;
  const { isAuthenticated } = useAuth();

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const pluginRegistered = useRef(false);
  const connectionAttempted = useRef(false);

  // Connect to WebSocket
  const connect = useCallback(async () => {
    const token = getAccessToken();

    if (!token) {
      setError("No authentication token available");
      return false;
    }

    if (webSocketService.getConnectionStatus()) {
      setIsConnected(true);
      return true;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await webSocketService.connect(token);
      setIsConnected(true);
      setIsConnecting(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
      setIsConnecting(false);
      return false;
    }
  }, []);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    webSocketService.disconnect();
    setIsConnected(false);
    connectionAttempted.current = false;
  }, []);

  // Subscribe to an event
  const subscribe = useCallback((event, handler) => {
    webSocketService.subscribe(event, handler);
  }, []);

  // Unsubscribe from an event
  const unsubscribe = useCallback((event, handler) => {
    webSocketService.unsubscribe(event, handler);
  }, []);

  // Emit an event
  const emit = useCallback((event, data) => {
    return webSocketService.emit(event, data);
  }, []);

  // Emit with acknowledgement
  const emitWithAck = useCallback((event, data, timeout) => {
    return webSocketService.emitWithAck(event, data, timeout);
  }, []);

  // Register plugin
  const registerPlugin = useCallback((pluginConfig) => {
    webSocketService.registerPlugin(pluginConfig);
  }, []);

  // Unregister plugin
  const unregisterPlugin = useCallback((pluginName) => {
    webSocketService.unregisterPlugin(pluginName);
  }, []);

  // Handle connection state changes
  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    const socket = webSocketService.getSocket();
    if (socket) {
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [isConnected]);

  // Auto-connect when authenticated
  useEffect(() => {
    if (autoConnect && isAuthenticated && !connectionAttempted.current) {
      connectionAttempted.current = true;
      connect();
    }

    // Disconnect when user logs out
    if (!isAuthenticated && isConnected) {
      disconnect();
    }
  }, [autoConnect, isAuthenticated, connect, disconnect, isConnected]);

  // Register plugin on mount
  useEffect(() => {
    if (plugin && !pluginRegistered.current) {
      registerPlugin(plugin);
      pluginRegistered.current = true;
    }

    return () => {
      if (plugin && pluginRegistered.current) {
        unregisterPlugin(plugin.name);
        pluginRegistered.current = false;
      }
    };
  }, [plugin, registerPlugin, unregisterPlugin]);

  // Sync connection status
  useEffect(() => {
    const checkStatus = () => {
      setIsConnected(webSocketService.getConnectionStatus());
    };

    // Check status periodically
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    emit,
    emitWithAck,
    registerPlugin,
    unregisterPlugin,
  };
};

export default useWebSocket;
