"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingScreen from "../common/LoadingScreen";
import GlobalStore from "@/store/GlobalStore";
import axios from "axios";

function WithAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { authenticatorStatus, setAuthenticatorStatus } = GlobalStore();
  const path = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    const isRootPath = path === "/";
    const shouldRedirect =
      authenticatorStatus === "authenticated" ? isRootPath : !isRootPath;
    if (shouldRedirect) {
      router.push(authenticatorStatus === "authenticated" ? "/dashboard" : "/");
    }
  }, [authenticatorStatus]);

  return <div>{loading ? <LoadingScreen /> : children}</div>;
}

export default WithAuth;
