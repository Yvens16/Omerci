import { DateTime } from "luxon";

export function rangeDate(end) {
  return new Array(end - 0).fill().map((d, i) => i + 1)
}
export function rangeYear (year) {
  return [year, year+1]
}
export function getMonths() {
  return ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
}


export function fromHumanToUtcDateTime(day, month, year) {
  return DateTime.utc(Number(year), Number(month), Number(day)).toISO();
}

export function fromIsoStringToThreeValueDate(isoDate) {
  return DateTime.fromISO(isoDate).toObject();
}
export function getNumberOfDaysInMonth(isoDate) {
  const {year, month} = fromIsoStringToThreeValueDate(isoDate);
  return DateTime.local(year, month).daysInMonth;
}
export function inAWeek() {
  // Date to add when creating a new card
  return DateTime.utc().plus({ days: 7 }).toISO();
}
export function howLongAgo(isoDate) {
  return DateTime.fromISO(isoDate).toRelative({ locale: "fr" })
}