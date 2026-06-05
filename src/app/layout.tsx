import React from "react";
import "@/app/globals.css";

export const metadata = {
  title: "Monteerly Studio Platform",
  description: "Monteerly Studio Platform Root Layout",
};

export default function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
