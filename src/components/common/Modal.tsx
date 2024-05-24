"use client";

import GlobalStore from "@/store/GlobalStore";
import { getDate, getTransactionFee } from "@/utils/TransactionEth";
import React from "react";
import { IoCloseCircle, IoCloseSharp } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";

function Modal() {
  const { selectedTrans, modalOpen, setModalOpen } = GlobalStore();

  return (
    <div
      onClick={() => setModalOpen(false)}
      className={`fixed inset-0 bg-main/80 z-[1000] flex justify-center items-center duration-200 ease-in ${
        modalOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {selectedTrans !== null && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-accent2 shadow-md rounded-lg w-[300px] p-[15px] relative z-[1001] duration-200 ease-in ${
            modalOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <IoCloseCircle
            onClick={() => setModalOpen(false)}
            className="absolute top-[15px] right-[15px] text-xl cursor-pointer hover:text-accent duration-200 ease-in"
          />
          <div>Additional Info</div>
          <div className="flex flex-col gap-[10px] mt-[20px]">
            <div className="pb-[10px] border-b-[1px] border-main">
              <div className="text-accent">Status</div>
              <div className="text-sm">
                {selectedTrans.isError === "0" ? (
                  <div className="flex items-center gap-[3px]">
                    <IoIosCheckmarkCircle className="-mt-[1px] text-green-600" />
                    <div>Success</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-[2px]">
                    <IoCloseSharp className="-mt-[1px] text-red-600 text-lg" />
                    <div>Failed</div>
                  </div>
                )}
              </div>
            </div>
            <div className="pb-[10px] border-b-[1px] border-main">
              <div className="text-accent">Transaction Hash</div>
              <div className="text-sm overflow-hidden text-ellipsis max-w-full">
                {selectedTrans.hash}
              </div>
            </div>
            <div className="pb-[10px] border-b-[1px] border-main">
              <div className="text-accent">Transaction Fee</div>
              <div className="text-sm">
                {getTransactionFee(
                  selectedTrans.gasUsed,
                  selectedTrans.gasPrice
                )}{" "}
                ETH
              </div>
            </div>
            <div className="pb-[10px] border-main">
              <div className="text-accent">Timestamp</div>
              <div className="text-sm">{getDate(+selectedTrans.timeStamp)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
