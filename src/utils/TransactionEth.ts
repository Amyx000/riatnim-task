import axios from "axios";

export function shortenAddress(address: string) {
  if (address.length !== 42) {
    return address.slice(0, 10) + "...";
  }
  const firstPart = address.slice(0, 10); // Includes 10 characters
  const lastPart = address.slice(-8); // Last 8 characters
  return `${firstPart}...${lastPart}`;
}

export function toEth(value: string) {
  return parseFloat((+value / Math.pow(10, 18)).toFixed(8)) + " ETH";
}

export function getTransactionFee(gasUsed: string, gasPrice: string) {
  const transactionFee = Number(BigInt(gasUsed) * BigInt(gasPrice));
  return parseFloat((transactionFee / Math.pow(10, 18)).toFixed(8));
}

export function getDate(time: number) {
  return new Date(time * 1000).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export const fetchTransactions = async (
  page: number
): Promise<TransactionType[] | null> => {
  const params = {
    module: "account",
    action: "txlist",
    address: "0xa83114A443dA1CecEFC50368531cACE9F37fCCcb",
    page,
    offset: 10, // Taking only the first 10 result as the provided address has large number of transaction which would be difficult for this assignment purpose.
    sort: "desc",
    apikey: process.env.NEXT_PUBLIC_ETHSCANAPI,
  };
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_ETHSCAN_ENDPOINT as string,
      { params }
    );
    if (data.status === "0") throw new Error(data.result);
    return data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
