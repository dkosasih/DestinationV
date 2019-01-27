import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { NativeDateAdapter } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DestVDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    const day = date.getDate();
    const month = DateTime.fromJSDate(date).monthShort;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${this._to2digit(day)} ${month} ${year} ${this._to2digit(hours)}:${this._to2digit(minutes)}`;
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}
