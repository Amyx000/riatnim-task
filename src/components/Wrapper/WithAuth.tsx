"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingScreen from "../common/LoadingScreen";
import GlobalStore from "@/store/GlobalStore";
import axios from "axios";
import { toast } from "react-toastify";

function WithAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { setAuthenticatorStatus } = GlobalStore();
  const path = usePathname();

  const handleAuth = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/isauth");
      setAuthenticatorStatus(data.auth ? "authenticated" : "unauthenticated");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAuth();
  }, [path]);

  // useEffect(() => {
  //   const isRootPath = path === "/";
  //   const shouldRedirect =
  //     authenticatorStatus === "authenticated" ? isRootPath : !isRootPath;
  //   if (shouldRedirect) {
  //     router.push(authenticatorStatus === "authenticated" ? "/dashboard" : "/");
  //   }
  // }, [authenticatorStatus]);

  const handleConnection = (connected: boolean) => {
    if (connected) {
      toast.success("Connected to internet");
    } else {
      toast.error("Internet connection fail");
    }
  };

  useEffect(() => {
    window.addEventListener("online", () => handleConnection(true));
    window.addEventListener("offline", () => handleConnection(false));

    return () => {
      window.removeEventListener("online", () => handleConnection(true));
      window.removeEventListener("offline", () => handleConnection(false));
    };
  }, []);

  return <div>{loading ? <LoadingScreen /> : children}</div>;
}

export default WithAuth;
