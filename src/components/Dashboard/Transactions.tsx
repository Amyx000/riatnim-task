"use client";

import {
  fetchTransactions,
  shortenAddress,
  toEth,
} from "@/utils/TransactionEth";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";
import GlobalStore from "@/store/GlobalStore";
import { toast } from "react-toastify";

function Transactions() {
  const [data, setData] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    //fetch api
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions(1);
        if (data !== null) setData(data);
        else {
          toast.error("Something went Wrong!");
        }
      } catch (error) {
        toast.error("Something went Wrong!");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function calculateOffsetValue() {
    const mainEl = document.querySelector("#mainContainer");
    const columnEl = document.querySelector("#column0");
    if (mainEl && columnEl) {
      const calulatedOffset =
        (mainEl as HTMLElement).offsetHeight -
        (columnEl as HTMLElement).offsetHeight;
      setOffset(calulatedOffset);
    }
  }
  useEffect(() => {
    calculateOffsetValue();
  }, [data]);

  return (
    <div id="mainContainer" className="flex-1 overflow-hidden">
      {loading ? (
        <div className="flex justify-center p-[30px]">
          <ScaleLoader
            color="#daff09"
            height={37}
            margin={3}
            radius={2}
            width={10}
          />
        </div>
      ) : (
        <motion.div className="flex sm:flex-row flex-col gap-[30px] w-max mx-auto">
          {data.length ? (
            [1, 2, 3].map((item, i) => {
              return (
                <motion.div
                  key={i}
                  id={`column${i}`}
                  animate={{ y: (i + 1) % 2 ? [0, offset] : [offset, 0] }}
                  transition={{
                    duration: 20,
                    repeatType: "reverse",
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col gap-[30px]"
                >
                  {data.map((item, index) => (
                    <Card item={item} key={index} />
                  ))}
                </motion.div>
              );
            })
          ) : (
            <div>No transaction found!</div>
          )}
        </motion.div>
      )}
    </div>
  );
}

const Card = ({ item }: { item: TransactionType }) => {
  const { setSelectedTrans, setModalOpen } = GlobalStore();

  return (
    <div
      onClick={() => {
        setSelectedTrans(item);
        setModalOpen(true);
      }}
      className="p-[10px] bg-accent2 hover:bg-accent duration-200 ease-in rounded-md cursor-pointer group"
    >
      <div>
        <span className="text-accent group-hover:text-accent2 duration-200 ease-in">
          From:{" "}
        </span>
        <span className="text-sm group-hover:text-main font-semibold">
          {shortenAddress(item.from)}
        </span>
      </div>
      <div>
        <span className="text-accent group-hover:text-accent2 duration-200 ease-in">
          To:{" "}
        </span>
        <span className="text-sm group-hover:text-main font-semibold">
          {shortenAddress(item.to)}
        </span>
      </div>
      <div>
        <span className="text-accent group-hover:text-accent2 duration-200 ease-in">
          Value:{" "}
        </span>
        <span className="text-sm group-hover:text-main font-semibold">
          {toEth(item.value)}
        </span>
      </div>
    </div>
  );
};

export default Transactions;
