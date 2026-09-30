import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <p>
            There was an error with this page. <a href="/">Click here</a> to go back to the home page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;