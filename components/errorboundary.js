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
          <div className="luxury-surface mx-auto max-w-xl border border-black/8 px-8 py-16 text-center md:px-12">
            <p className="page-eyebrow">Unexpected Error</p>
            <h1 className="page-title mt-3">Something went wrong</h1>
            <p className="mx-auto mt-4 max-w-sm text-sm text-black/65">
              An unexpected error occurred. Please refresh the page and try again.
            </p>
            <button type="button" className="btn-luxury mt-8" onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        </Layout>
      );
    }

    return this.props.children;
  }
}
