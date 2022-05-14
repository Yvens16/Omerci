import { DateTime } from "luxon";
import { rangeDate, rangeYear, fromHumanToUtcDateTime, fromIsoStringToThreeValueDate, getNumberOfDaysInMonth, howLongAgo } from './dateUtils';

test("RangeDate return array of numbers of days", () => {
  const daysInMonth = DateTime.local(2022, 2).daysInMonth;
  console.log('daysInMonth:', daysInMonth)
  const dates = rangeDate(daysInMonth)
  expect(dates).toHaveLength(28);
  expect(dates[0]).toEqual(1);
  expect(dates[dates.length - 1]).toEqual(28);
})

test("RangeDate return 2 years the current one and the future one", () => {
  const years = rangeYear(2022);
  expect(years).toHaveLength(2);
  expect(years[0]).toEqual(2022);
  expect(years[1]).toEqual(2023);
})

test("From human readable date (string) to UTC", () => {
  const dateTime = fromHumanToUtcDateTime("22", "3", "2022");
  expect(dateTime).toBe("2022-03-22T00:00:00.000Z")
})

test("From IsoString to object containing day, month and year (string)", () => {
  const dateObject = fromIsoStringToThreeValueDate("2022-03-22T00:00:00.000Z");
  expect(dateObject).toEqual(
    expect.objectContaining({
      year:2022,
      month: 3,
      day: 22,
    })
  )
})

test("how many hours | week | days | month | years ago", () => {
  console.log("@@@@@@@@@", howLongAgo('2016-05-25T09:08:34.123'))
})