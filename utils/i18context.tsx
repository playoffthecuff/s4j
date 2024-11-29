"use client";
import { createContext, useContext, ReactNode } from "react";

export interface Dictionary {
  [key: string]: string;
}
const i18nContext = createContext<Dictionary | undefined>(undefined);

export const I18nProvider = ({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: ReactNode;
}) => {
  return (
    <i18nContext.Provider value={dictionary}>{children}</i18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(i18nContext);
  if (!context) throw new Error("must be used inside I18nProvider");
  return context;
};
