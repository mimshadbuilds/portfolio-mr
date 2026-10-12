import { createContext, useContext } from "react";
import type { PortfolioContent } from "../data/portfolio";

export interface PortfolioContextValue {
  content: PortfolioContent;
  error: string | null;
  saveContent: (content: PortfolioContent) => Promise<void>;
}

export const PortfolioContext =
  createContext<PortfolioContextValue | null>(null);

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) {
    throw new Error("usePortfolio must be used within PortfolioProvider.");
  }
  return value;
}
