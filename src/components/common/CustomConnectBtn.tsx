"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PiCaretDownBold } from "react-icons/pi";

export const CustomConnectBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    type="button"
                    onClick={openConnectModal}
                    className="border-accent border-[1px] shadow-[2px_2px] active:shadow-none duration-150 ease-in text-accent text-sm px-[12px] py-[9px]"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    justifyContent: "end",
                  }}
                >
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="rounded-md bg-accent2 px-[10px] py-[7px] group"
                  >
                    <div className="flex items-center gap-[5px]">
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 20, height: 20 }}
                            />
                          )}
                        </div>
                      )}
                      <div>{chain.name}</div>
                      <PiCaretDownBold className="text-white text-lg mt-[-2px] group-hover:translate-y-[2px] duration-200 ease-in" />
                    </div>
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="rounded-md bg-accent2 px-[10px] py-[7px] group"
                  >
                    <div className="flex items-center gap-[5px]">
                      <div>
                        {account.displayBalance ? account.displayBalance : ""}
                      </div>
                      <div>{account.ensAvatar}</div>
                      <div className="text-accent">{account.displayName}</div>
                      <PiCaretDownBold className="text-white text-lg mt-[-2px] group-hover:translate-y-[2px] duration-200 ease-in" />
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
