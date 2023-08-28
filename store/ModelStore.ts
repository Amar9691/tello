import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { fetchBoardByColumn } from "@/lib/getTodosGroupByColumns";
import { database, storage } from "@/appwrite";

interface ModelState {
  isOpen: boolean;
  openModel: () => void;
  closeModel: () => void;
}

export const useModelStore = create<ModelState>((set, get) => ({
  isOpen: false,
  openModel: () => {
    set({ isOpen: true });
  },
  closeModel: () => {
    set({ isOpen: false });
  },
}));
