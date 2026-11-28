import type { Activity } from "./emotions";

export const activityLabels: Record<Activity, string> = {
  more: "Wzrost odczuwanej aktywności",
  less: "Spadek odczuwanej aktywności",
  felt: "Wyraźnie odczuwane",
  none: "Bez wyróżnienia",
};

export const activityShort: Record<Activity, string> = {
  more: "Wzrost",
  less: "Spadek",
  felt: "Odczuwane",
  none: "Bez wyróżnienia",
};
