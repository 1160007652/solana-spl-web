import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  optimism,
  polygon,
  AppKitNetwork,
  solana,
  solanaTestnet,
  solanaDevnet,
} from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

export const networks = [
  mainnet,
  arbitrum,
  avalanche,
  base,
  optimism,
  polygon,
  solana,
  solanaTestnet,
  solanaDevnet,
] as [AppKitNetwork, ...AppKitNetwork[]];

// Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

// Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter();
