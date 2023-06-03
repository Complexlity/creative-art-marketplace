import { type AppType } from "next/dist/shared/lib/utils";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "~/styles/globals.css"

const activeChain = "ethereum"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
