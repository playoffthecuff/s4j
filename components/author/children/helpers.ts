import { Locale } from "@/i18n-config";

export const formatDate = (
  monthVisible: boolean,
  date: string,
  lng: Locale
) => {
  const d = date.split("-");
  const dictionary = {
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  d[1] = monthVisible ? dictionary[lng][+d[1]] : "";
  d[2] = "";
  return d.filter((v) => v !== "").join(" ");
};

export const filterDate = (monthVisible: boolean, date: string) => {
  const d = date.split("-");
  if (!monthVisible) d[1] = "";
  d[2] = "";
  return d.filter((v) => v !== "").join(".");
};
