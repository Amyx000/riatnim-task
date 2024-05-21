"use client";

import axios from "axios";
import React, { useEffect } from "react";

function HomeMain() {
  const fetchTransactions = async () => {
    const params = {
      module: "account",
      action: "txlist",
      address: "0xa83114A443dA1CecEFC50368531cACE9F37fCCcb",
      page: 1,
      offset: 10,
      sort: "asc",
      apikey: process.env.NEXT_PUBLIC_ETHSCANAPI,
    };
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_ETHSCAN_ENDPOINT as string,
        { params }
      );
      if (data.status === "0") throw new Error(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //fetch api
    fetchTransactions();
  }, []);

  return (
    <div>
      <div>Data</div>
    </div>
  );
}

export default HomeMain;
