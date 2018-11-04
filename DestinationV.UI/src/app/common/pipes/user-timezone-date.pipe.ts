import { Pipe, PipeTransform, Inject } from '@angular/core';
import { DateTime } from 'luxon';
import { CURRENT_IANA_TIMEZONE } from 'src/app/configs/timezone.config';

@Pipe({
  name: 'uDate'
})
export class UserTimezoneDatePipe implements PipeTransform {
  constructor(
    @Inject(CURRENT_IANA_TIMEZONE) private ianaTimezone: string
  ) { }

  transform(value: any, format: string): any {
    if (typeof (value) === 'string') {
      return DateTime.fromISO(value).toUTC().setZone(this.ianaTimezone).toFormat(format);
    } else {
      return DateTime.fromObject(value).toUTC().setZone(this.ianaTimezone).toFormat(format);
    }
  }
}
