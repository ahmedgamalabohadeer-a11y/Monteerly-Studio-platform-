'use client';
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Here you would log to a service like Sentry
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="h-full w-full min-h-[300px] flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-red-500/20 rounded-xl text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">عذراً، حدث خطأ غير متوقع</h2>
          <p className="text-slate-400 mb-6 max-w-md">
            لم نتمكن من تحميل هذا الجزء من الصفحة. لا تقلق، بياناتك آمنة.
          </p>
          <div className="bg-black/30 p-4 rounded-lg mb-6 max-w-md w-full overflow-hidden text-left">
             <code className="text-xs text-red-300 font-mono">
                Error: {this.state.error?.message || "Unknown Error"}
             </code>
          </div>
          <Button 
            onClick={() => this.setState({ hasError: false })}
            className="bg-white text-black hover:bg-slate-200"
          >
            <RefreshCw size={16} className="mr-2" /> إعادة المحاولة
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

################################################################################