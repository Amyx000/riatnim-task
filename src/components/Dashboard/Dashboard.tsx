import React from "react";
import Transactions from "./Transactions";
import Modal from "../common/Modal";

function Dashbaord() {
  return (
    <div className="h-full pb-[20px] flex flex-col">
      <div className="text-center sm:text-5xl text-3xl font-semibold text-accent p-[20px]">
        TRANSACTIONS
      </div>
      <Transactions />
      <Modal />
    </div>
  );
}

export default Dashbaord;
