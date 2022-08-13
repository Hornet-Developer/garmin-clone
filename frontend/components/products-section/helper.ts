import { CategoryType, SerieType } from "types";

export function initiateState(series: SerieType[], serieId?: string) {
  const picked = Object.create({});
  for (let serie of series) {
    picked[serie.id] = false;
  }
  if (serieId) picked[serieId] = true;
  return picked;
}
