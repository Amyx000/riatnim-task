import { create } from "zustand";

interface GlobalStoreType {
  selectedTrans: TransactionType | null;
  setSelectedTrans: (selectedTrans: TransactionType | null) => void;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  authenticatorStatus: "loading" | "unauthenticated" | "authenticated";
  setAuthenticatorStatus: (
    authenticatorStatus: "loading" | "unauthenticated" | "authenticated"
  ) => void;
}

const GlobalStore = create<GlobalStoreType>((set) => ({
  selectedTrans: null,
  setSelectedTrans: (selectedTrans) => set({ selectedTrans }),
  modalOpen: false,
  setModalOpen: (modalOpen) => set({ modalOpen }),
  authenticatorStatus: "unauthenticated",
  setAuthenticatorStatus: (authenticatorStatus) => set({ authenticatorStatus }),
}));

export default GlobalStore;
