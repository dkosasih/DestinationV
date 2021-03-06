import { TestBed, async, } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouteListComponent } from './route-list.component';
import { UserTimezoneDatePipe } from 'src/app/common/pipes/user-timezone-date.pipe';
import { CURRENT_IANA_TIMEZONE } from 'src/app/configs/timezone.config';
import { LoadRoutes } from '../store/actions/routes.action';
import { DateTime } from 'luxon';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createSpyObj } from 'src/test-helper/createSpyObj';

const mockIanaValue = 'Asia/Jakarta';
const storeMock = createSpyObj('store', ['dispatch', 'pipe']);

describe('RouteListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CURRENT_IANA_TIMEZONE, useValue: mockIanaValue },
        { provide: Store, useValue: storeMock }
      ],
      declarations: [RouteListComponent, UserTimezoneDatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));


  test('should dispatch LoadRoutes and getRoutes', () => {
    const fixture = TestBed.createComponent(RouteListComponent);
    const action = new LoadRoutes();
    const store = TestBed.get(Store);

    fixture.detectChanges();

    expect(store.pipe).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  test('should list the value of return object', () => {
    const mockRoutes =
      of([
        {
          id: 'bla bla',
          origin: {
            id: 'abc',
            name: 'some origin'
          },
          destination: {
            id: 'bcd',
            name: 'some destination'
          },
          departUtc: DateTime.fromISO('2018-01-01T00:00:00Z').toISO()
        }
      ]);

    const store = TestBed.get(Store);
    store.pipe = jest.fn(() => mockRoutes);

    const fixture = TestBed.createComponent(RouteListComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    const buttonEdit = compiled.querySelector('button[data-testId="buttonEdit"]');
    const origin = compiled.querySelector('div[data-testId="routeOrigin"]');
    const destination = compiled.querySelector('div[data-testId="routeDestination"]');
    const date = compiled.querySelector('div[data-testId="routeDate"]');

    expect(buttonEdit).not.toBeNull();
    expect(origin.textContent.trim()).toBe('Origin: some origin');
    expect(destination.textContent.trim()).toBe('Destination: some destination');
    expect(date.textContent.trim()).toBe('Departing time: 01/01/2018 07:00');
  });
});
