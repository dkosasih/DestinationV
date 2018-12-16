import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { RouteDto } from '../../dtos/route.dto';


export interface RouteDetailsAnswer {
  buttonType: string;
  data?: RouteDto;
}

@Component({
  templateUrl: './route-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteDetailsComponent implements OnInit {
  @Input()
  dto: RouteDto;

  @Output()
  result: EventEmitter<RouteDetailsAnswer> = new EventEmitter();

  constructor() {}

  deleteClick() {
    this.result.emit({buttonType: 'delete'});
    this.dismiss();
  }

  okClick() {
    this.result.emit({buttonType: 'ok'});
    this.dismiss();
  }

  edittedClick() {
    this.result.emit({ buttonType: 'edit', data: this.dto });
    this.dismiss();
  }

  dismiss() {
    //this.modalServiceRef.hide();
  }

  ngOnInit() {}
}
