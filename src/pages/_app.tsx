import "@rainbow-me/rainbowkit/styles.css";
import { Analytics } from '@vercel/analytics/react';
import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import React from "react";
import "~/styles/globals.css";
import NftsDataContextProvider from "../contexts/NftsDataContext";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
        <meta
          property="og:image"
          content="https://creative-art-marketplace.vercel.app/og.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <SafeHydrate>
        <ClerkProvider
          appearance={{
            
          }}
           {...pageProps}
        >
          <NftsDataContextProvider>
            <Component {...pageProps} />
          </NftsDataContextProvider>
        </ClerkProvider>
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
