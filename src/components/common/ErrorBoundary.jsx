import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-4xl">
                ⚠️
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-600 mb-6">
              An unexpected error occurred. Please try refreshing the page or go
              back to continue.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
              >
                Refresh Page
              </button>

              <button
                onClick={this.handleGoBack}
                className="px-5 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
