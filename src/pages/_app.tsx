import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import React from "react";
import "~/styles/globals.css";
import NftsDataContextProvider from "../contexts/legacy_NftsDataContext";
import NextNProgress from "nextjs-progressbar";
import {NextUIProvider} from '@nextui-org/react'

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
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
        <ClerkProvider appearance={{}} {...pageProps}>
          <QueryClientProvider client={queryClient}>
            <NftsDataContextProvider>
              <NextUIProvider>
              <NextNProgress color="#d2f55e" height={4} options={{ showSpinner: false }} />
              <Component {...pageProps} />
                </NextUIProvider>
            </NftsDataContextProvider>
          </QueryClientProvider>
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
