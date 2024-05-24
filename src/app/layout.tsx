import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/Navbar";
import RainbowKitMain from "@/components/Wrapper/RainbowKitMain";
import WithAuth from "@/components/Wrapper/WithAuth";
import { Bounce, ToastContainer, toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RIATNIM.ETH",
  description: "RIATNIM.ETH",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <RainbowKitMain>
          <WithAuth>
            <div className="flex flex-col h-svh">
              <Navbar />
              <div className="flex-1 min-h-0">{children}</div>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
                draggable
                theme="light"
                transition={Bounce}
              />
            </div>
          </WithAuth>
        </RainbowKitMain>
      </body>
    </html>
  );
}
