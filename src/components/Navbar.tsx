import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

function Navbar() {
  return (
    <div className="flex justify-end p-[10px]">
      <ConnectButton />
    </div>
  );
}

export default Navbar;
