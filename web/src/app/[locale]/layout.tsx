import React from "react";
import { ToastProvider } from "@/components/ui/Toast";

export default function RootFeatureLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-foreground font-cairo antialiased">
        <main className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
