import {
  RainbowKitProvider,
  Theme,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Analytics } from '@vercel/analytics/react';
import merge from "lodash.merge";
import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import React from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "~/styles/globals.css";
import ogImage from '../../public/og.png';
import NftsDataContextProvider from "../contexts/NftsDataContext";


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
    body: "ttramillas, sans-serif",
  },
  radii: {
    actionButton: "0.5rem",
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="A place to discover, create and buy exclusive NFTs."
        />
        <meta property="og:title" content="CreativeArt Marketplace" />
        <meta
          property="og:description"
          content="A place to discover, create and buy exclusive NFTs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="." />
        <meta property="og:site_name" content="CreativeArt Marketplace" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image" content="/og.png" />
        <meta property="og:locale" content="en_US" />

      </Head>
      <SafeHydrate>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={myCustomTheme} coolMode>
            <NftsDataContextProvider>
              <Component {...pageProps} />
            </NftsDataContextProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </SafeHydrate>
      <Analytics />
    </>
  );
};

function SafeHydrate({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

export default MyApp;
