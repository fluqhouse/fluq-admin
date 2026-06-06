import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AuthProvider } from "./provider/AuthProvider";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <App />

            {/* ✅ Global Toaster */}
            <Toaster
              position="top-right"
              toastOptions={{
                success: {
                  style: {
                    background: "#22c55e", // softer green
                    color: "#ffffff",
                    fontSize: "13px", // smaller text
                    padding: "10px 14px", // slightly smaller padding
                    borderRadius: "8px", // rounded corners
                  },
                },
                error: {
                  style: {
                    background: "#ef4444", // softer red
                    color: "#ffffff",
                    fontSize: "13px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                  },
                },
              }}
            />
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
