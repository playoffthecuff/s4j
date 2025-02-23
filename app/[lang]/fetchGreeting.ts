import { Locale } from "@/i18n-config";
import { client } from "@/lib/sanity/client";

export const fetchGreetings = async (l: Locale) => {
  const q = `* [_type == 'phrase' && name == 'Приветствие'][0].phrase.${l}`;
  const d: string = await client.fetch(q);
  return d;
};
