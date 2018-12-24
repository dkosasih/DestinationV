import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { RouteDto } from '../../dtos/route.dto';
import { PlaceDto } from 'src/app/common/dtos/place.dto';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { utcToLocal, localToUtc } from 'src/app/common/helper/date/date.converter';
import { CURRENT_IANA_TIMEZONE } from 'src/app/configs/timezone.config';

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
  private _route: RouteDto;
  @Input()
  get route(): RouteDto {
    return this._route;
  }
  set route(dto: RouteDto) {
    this.modelToForm(dto);
  }

  @Input()
  places: PlaceDto[];

  @Output()
  result: EventEmitter<RouteDetailsAnswer> = new EventEmitter();

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(CURRENT_IANA_TIMEZONE) private ianaTimezone: string
  ) {
    this.form = fb.group({
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      departLocalTime: [null, [Validators.required]]
    });
  }

  private modelToForm(dto: RouteDto): any {
    this.form.patchValue({
      origin: dto.origin.id,
      destination: dto.destination.id,
      departLocalTime: utcToLocal(dto.departUtc, this.ianaTimezone), // this.uDatePipe.transform(dto.departUtc, 'dd/MM/yyyy HH:mm'),
    });
  }

  deleteClick() {
    this.result.emit({buttonType: 'delete'});
  }

  edittedClick() {
    this.result.emit({ buttonType: 'edit', data: this._route });
  }

  ngOnInit() {}
}
