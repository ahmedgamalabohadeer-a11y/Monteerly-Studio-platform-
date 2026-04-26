import React from "react";

export default function FeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-in fade-in duration-700">
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
