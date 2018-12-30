import { DateTime } from 'luxon';
import { NativeDateAdapter } from '@angular/material';


export class DestVDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      const day = date.getDate();
      const month = DateTime.fromJSDate(date).monthShort;
      const year = date.getFullYear();
      return `${this._to2digit(day)} ${month} ${year}`;
  }

  private _to2digit(n: number) {
      return ('00' + n).slice(-2);
  }
}
