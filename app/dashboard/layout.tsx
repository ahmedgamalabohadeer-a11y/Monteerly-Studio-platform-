"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#020617",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        style={{
          paddingRight: 0,
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
