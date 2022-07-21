import { SerieType } from "types";

export function initiateState(series: SerieType[]) {
  const picked = Object.create({});
  for (let serie of series) {
    picked[serie.id] = false;
  }
  return picked;
}
