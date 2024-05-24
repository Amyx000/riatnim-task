type TransactionType = {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  blockNumber: string;
  gasUsed: string;
  gasPrice: string;
  isError: "0" | "1";
};
