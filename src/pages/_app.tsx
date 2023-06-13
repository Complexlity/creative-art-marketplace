import { type AppType } from "next/dist/shared/lib/utils";
import "@rainbow-me/rainbowkit/styles.css";
import "~/styles/globals.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import NftsDataContextProvider  from "../contexts/DataContext";
import React from "react";
import merge from 'lodash.merge'

const apiKey = process.env.ALCHEMY_ID as string;

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey }), publicProvider()]
);

const projectId = process.env.WALLET_CONNECT_PROJECT_ID;
const { connectors } = getDefaultWallets({
  appName: "dapp-frontend",
  projectId: projectId,
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});


const myCustomTheme: Theme = merge(darkTheme(), {
  colors: {
    accentColor: "#d2f55e",
    accentColorForeground: "#1f2937",
  },
  fonts: {
    body: "roboto, sans-serif"
  },
  radii: {
    actionButton: "0.5rem"
  }
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SafeHydrate>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={myCustomTheme}
          coolMode
        >
            <NftsDataContextProvider>
              <Component {...pageProps} />
            </NftsDataContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </SafeHydrate>
  );
};


function SafeHydrate({ children }: {children: React.ReactNode}) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

export default MyApp;
