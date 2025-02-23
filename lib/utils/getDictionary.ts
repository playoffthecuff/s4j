import { Locale } from "@/i18n-config";
import "server-only";

const dictionaries = {
  en: () =>
    import("../../dictionaries/en.json").then((module) => module.default),
  ru: () =>
    import("../../dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
