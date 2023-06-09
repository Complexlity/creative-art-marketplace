import { type AppType } from "next/dist/shared/lib/utils";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "@rainbow-me/rainbowkit/styles.css";
import "~/styles/globals.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import NftsDataContextProvider  from "../utils/DataContext";

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

const activeChain = "ethereum";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          // accentColor: "orange",
        })}
        coolMode
      >
        <ThirdwebProvider activeChain={activeChain}>
          <NftsDataContextProvider>
            <Component {...pageProps} />
          </NftsDataContextProvider>
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
