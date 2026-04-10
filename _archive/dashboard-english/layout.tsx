import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Monteerly Studio",
  description: "Manage your creative projects and team in one place.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
