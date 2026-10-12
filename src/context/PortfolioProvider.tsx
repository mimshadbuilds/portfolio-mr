import { useEffect, useMemo, useState, type ReactNode } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  DEFAULT_PORTFOLIO,
  isPortfolioContent,
  type PortfolioContent,
} from "../data/portfolio";
import {
  PortfolioContext,
  type PortfolioContextValue,
} from "./PortfolioContext";

const portfolioDocument = doc(db, "portfolio", "content");

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(DEFAULT_PORTFOLIO);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return onSnapshot(
      portfolioDocument,
      (snapshot) => {
        if (!snapshot.exists()) {
          setContent(DEFAULT_PORTFOLIO);
          setError(null);
          return;
        }

        const data: unknown = snapshot.data();
        if (!isPortfolioContent(data)) {
          setError(
            "Saved portfolio content has an unexpected format. Review the document in Firestore or restore the default content from the admin panel.",
          );
          return;
        }

        setContent(data);
        setError(null);
      },
      (snapshotError) => {
        setError(
          `Could not load saved portfolio content: ${snapshotError.message}`,
        );
      },
    );
  }, []);

  const saveContent = async (nextContent: PortfolioContent) => {
    await setDoc(portfolioDocument, nextContent);
    setContent(nextContent);
    setError(null);
  };

  const value = useMemo<PortfolioContextValue>(
    () => ({ content, error, saveContent }),
    [content, error],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
