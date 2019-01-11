import { TestBed, async } from '@angular/core/testing';
import { RouteDetailsComponent } from './route-details.component';
import { UserTimezoneDatePipe } from 'src/app/common/pipes/user-timezone-date.pipe';
import { CURRENT_IANA_TIMEZONE } from 'src/app/configs/timezone.config';
import { DateTime } from 'luxon';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouteDto } from '../../dtos/route.dto';
import { OperationType } from 'src/app/common/constants/operation-type.constant';
import { DateAdapter } from '@angular/material';
import { DestVDateAdapter } from 'src/app/common/helper/date/date-adapter';
import { localToUtc } from 'src/app/common/helper/date/date.converter';

const mockIanaValue = 'Asia/Jakarta';
const mockRoute: RouteDto = {
  id: 'bla bla',
  origin: {
    id: 'abc',
    name: 'some origin'
  },
  destination: {
    id: 'bcd',
    name: 'some destination'
  },
  departUtc: localToUtc(new Date('2018-01-01T00:00:00'), mockIanaValue) as unknown as Date // DateTime.fromISO('2018-01-01T00:00:00Z').toISO() as unknown as Date
};

const mockPlaces = [{
  id: 'abcd',
  name: 'some origin'
},
{
  id: 'bcd',
  name: 'some destination'
  }];

describe('RouteDetailsComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CURRENT_IANA_TIMEZONE, useValue: mockIanaValue },
        {provide: DateAdapter, useClass: DestVDateAdapter},
        FormBuilder
      ],
      declarations: [
        RouteDetailsComponent,
        UserTimezoneDatePipe,
      ],
     // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));



  it('should create the component', () => {
    const fixture = TestBed.createComponent(RouteDetailsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should emit a button type 'delete' on button click`, (done) => {
    const fixture = TestBed.createComponent(RouteDetailsComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.componentInstance.route = mockRoute;
    fixture.componentInstance.places = mockPlaces;

    fixture.componentInstance.result.subscribe(x => {
      expect(x.buttonType).toBe(OperationType.DELETE);
      expect(x.data).toEqual(mockRoute);
      done();
    });

    fixture.detectChanges();
    compiled.querySelector('button[data-testId="deleteRouteButton"]').click();
  });

  it(`should emit a button type 'update' and edited route value on button click`, (done) => {
    const fixture = TestBed.createComponent(RouteDetailsComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.componentInstance.route = mockRoute;
    fixture.componentInstance.places = mockPlaces;

    fixture.componentInstance.result.subscribe(x => {
      expect(x.buttonType).toBe(OperationType.UPDATE);
      expect(x.data).toEqual(mockRoute);
      done();
    });

    fixture.detectChanges();
    compiled.querySelector('button[data-testId="saveRouteButton"]').click();
  });
});
