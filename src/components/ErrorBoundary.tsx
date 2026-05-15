import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
        console.error("Uncaught error:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
          return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A1118] text-white p-6 font-sans text-center">
            <h1 className="text-2xl mb-4 text-[#D4AF37] font-serif">Something went wrong</h1>
            <p className="text-sm text-gray-400 mb-6 max-w-md">
              We're sorry, but an unexpected error occurred. Please try refreshing the page or check back later.
            </p>
            <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-[#D4AF37] text-[#0A1118] uppercase tracking-wider text-xs hover:bg-white transition-colors"
            >
                Refresh Page
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}
