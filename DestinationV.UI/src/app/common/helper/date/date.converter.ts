import { DateTime } from 'luxon';

export function utcToLocal(date: any /* ISO string */, ianaTimezone: string) {
  const local = DateTime.fromISO(date).toUTC().setZone(ianaTimezone);

  // Date will always convert back to browser timezone - ignore timezone offset
  // date and time return already assume the converted timezone
  // luxon month is one based and JSDate is zero based
  return new Date(local.year, local.month - 1, local.day, local.hour, local.minute, local.second);
}

export function localToUtc(date: Date /* date from js Date */, ianaTimezone: string) {
  return DateTime.fromObject({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: 0,
    zone: ianaTimezone
  }).toUTC().toISO();
}
