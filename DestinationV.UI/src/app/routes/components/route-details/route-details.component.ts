import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { RouteDto } from '../../dtos/route.dto';
import { PlaceDto } from 'src/app/common/dtos/place.dto';


export interface RouteDetailsAnswer {
  buttonType: string;
  data?: RouteDto;
}

@Component({
  selector: 'destinationv-route-item',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteDetailsComponent implements OnInit {
  @Input()
  route: RouteDto;

  @Input()
  places: PlaceDto[];

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
    this.result.emit({ buttonType: 'edit', data: this.route });
    this.dismiss();
  }

  dismiss() {
    // this.modalServiceRef.hide();
  }

  ngOnInit() {}
}
