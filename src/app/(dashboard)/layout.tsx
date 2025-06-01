import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Reown Wallet Dashboard",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
