"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CodeLang } from "@/lib/highlight";

interface CodeLangState {
  lang: CodeLang;
  setLang: (lang: CodeLang) => void;
}

export const useCodeLangStore = create<CodeLangState>()(
  persist(
    (set) => ({
      lang: "js",
      setLang: (lang) => set({ lang }),
    }),
    { name: "algoverse-code-lang" }
  )
);
