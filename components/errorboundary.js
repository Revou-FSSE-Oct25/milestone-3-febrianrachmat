import { Component } from "react";
import Layout from "./layout";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled UI error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <div className="py-20 text-center">
            <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
            <p className="mb-6 text-gray-600">
              An unexpected error occurred. Please refresh the page and try again.
            </p>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-black px-6 py-3 font-semibold text-white"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </Layout>
      );
    }

    return this.props.children;
  }
}
