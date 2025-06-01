"use client";

import {
  wagmiAdapter,
  wagmiConfig,
  projectId,
  networks,
} from "@/constants/reown-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";

import { cookieToInitialState, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks,
  defaultNetwork: networks[0],
  features: {
    email: true,
    socials: ["google"],
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

function ReownProvider({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(wagmiConfig, cookies);

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ReownProvider;
