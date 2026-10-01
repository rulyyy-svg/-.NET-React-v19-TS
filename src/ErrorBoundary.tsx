import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface Props {
  children: ReactNode;
}

interface state {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, state> {
  public state: state = {
    hasError: false,
  };

public static getDerivedStateFromError(_: Error): state {
    return { hasError: true };
}

public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  console.error("Uncaught error:", error, errorInfo);
}

public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] text-center">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing.{" "}
            <Link to="/" className="text-primary underline hover:no-underline">
              Click here
            </Link>{" "}
            to back to the home page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;