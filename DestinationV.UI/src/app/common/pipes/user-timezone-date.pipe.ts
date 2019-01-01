import { Pipe, PipeTransform, Inject } from '@angular/core';
import { DateTime } from 'luxon';
import { CURRENT_IANA_TIMEZONE } from 'src/app/configs/timezone.config';
import { utcToLocal } from '../helper/date/date.converter';

@Pipe({
  name: 'uDate'
})
export class UserTimezoneDatePipe implements PipeTransform {
  constructor(
    @Inject(CURRENT_IANA_TIMEZONE) private ianaTimezone: string
  ) { }

  transform(value: string | Date, format: string): string {
    if (typeof (value) === 'string') {
      return DateTime.fromJSDate(utcToLocal(value, this.ianaTimezone)).toFormat(format);
    } else {
      return DateTime.fromJSDate(value).toUTC().setZone(this.ianaTimezone).toFormat(format);
    }
  }
}
