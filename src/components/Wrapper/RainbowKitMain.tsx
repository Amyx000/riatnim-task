"use client";

import React from "react";
import {
  createAuthenticationAdapter,
  darkTheme,
  getDefaultConfig,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SiweMessage } from "siwe";
import GlobalStore from "@/store/GlobalStore";
import { useRouter } from "next/navigation";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function RainbowKitMain({ children }: { children: React.ReactNode }) {
  const { authenticatorStatus, setAuthenticatorStatus } = GlobalStore();
  const router = useRouter();

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const { data } = await axios.get("/api/nonce");
      const nonce = data;
      return nonce;
    },
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in to my App.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
    },
    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },
    verify: async ({ message, signature }) => {
      const { data } = await axios.post("/api/verify", { message, signature });
      setAuthenticatorStatus("authenticated");
      router.push("/dashboard");
      return data.verify;
    },
    signOut: async () => {
      await axios.get("/api/logout");
      router.push("/");
      setAuthenticatorStatus("unauthenticated");
    },
  });
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={authenticatorStatus}
        >
          <RainbowKitProvider theme={darkTheme()}>
            {children}
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default RainbowKitMain;
