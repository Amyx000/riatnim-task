import NextImage from "next/image";
import React from "react";
import Logo from "./Logo.png";
import { CustomConnectBtn } from "../common/CustomConnectBtn";

function Navbar() {
  return (
    <div className="flex justify-between items-center p-[20px]">
      <NextImage src={Logo} alt="" width={40} height={40} />
      <CustomConnectBtn />
    </div>
  );
}

export default Navbar;
