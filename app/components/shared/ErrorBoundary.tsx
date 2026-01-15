"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { CyberButton } from "@/app/components/ui/CyberButton";

/**
 * Props for the ErrorBoundary component
 * @interface ErrorBoundaryProps
 */
interface ErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Custom fallback UI to render on error */
  fallback?: ReactNode;
}

/**
 * State for the ErrorBoundary component
 * @interface ErrorBoundaryState
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary - A React error boundary for graceful error handling
 * 
 * Catches JavaScript errors in child component tree, logs them,
 * and displays a fallback UI instead of crashing the app.
 * 
 * Features:
 * - Catches runtime errors in child components
 * - Displays a styled error message
 * - Provides a retry button to attempt recovery
 * - Supports custom fallback UI
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <Dashboard />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <GlassCard className="max-w-md text-center p-12">
            <div 
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"
              role="img"
              aria-label="Error icon"
            >
              <AlertTriangle size={40} className="text-red-400" />
            </div>
            <h2 className="text-2xl font-serif text-gold-100 mb-3">
              Something went wrong
            </h2>
            <p className="text-gold-200/60 mb-6">
              An unexpected error occurred. Please try again or refresh the page.
            </p>
            {this.state.error && (
              <p className="text-xs text-red-400/70 mb-6 font-mono break-all">
                {this.state.error.message}
              </p>
            )}
            <div className="flex items-center justify-center gap-4">
              <CyberButton 
                variant="primary" 
                onClick={this.handleRetry}
                leftIcon={<RefreshCw size={16} />}
              >
                Try Again
              </CyberButton>
              <CyberButton 
                variant="ghost" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </CyberButton>
            </div>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
