import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ActionReducerMap, StoreModule, Store } from '@ngrx/store';
import { RouteState, getRoutes } from '../store/reducers';
import { RouteListComponent } from './route-list.component';
import { UserTimezoneDatePipe } from 'src/app/common/pipes/user-timezone-date.pipe';
import { CURRENT_IANA_TIMEZONE } from 'src/app/configs/timezone.config';
import { environment } from 'src/environments/environment.prod';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { LoadRoutes } from '../store/actions/routes.action';
import { DateTime } from 'luxon';
import { of } from 'rxjs';

const mockReducer: ActionReducerMap<RouteState> = {
  routes: () => []
};

const storeMock = jasmine.createSpyObj('store', ['dispatch', 'select']);
const bsModalServiceSpy = jasmine.createSpyObj('BsModalService', ['show']);

describe('RouteListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule],
      providers: [
        { provide: BsModalService, useValue: bsModalServiceSpy },
        { provide: Store, useValue: storeMock },
        { provide: CURRENT_IANA_TIMEZONE, useValue: environment.timezone }
      ],
      declarations: [RouteListComponent, UserTimezoneDatePipe]
    }).compileComponents();
  }));

  it('should dispatch LoadRoutes and getRoutes', () => {
    const fixture = TestBed.createComponent(RouteListComponent);
    const action = new LoadRoutes();
    const store = TestBed.get(Store);

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call modal service when view details is clicked', async(() => {
    const selector = getRoutes;
    const store = TestBed.get(Store);
    const bsService = TestBed.get(BsModalService);
    store.select.and.callFake(function (args) {
      expect(args).toBe(selector);
      return of([
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
          departUtc: DateTime.fromISO('2018-01-01T00:00:00').toUTC()
        }
      ]);
    });

    const fixture = TestBed.createComponent(RouteListComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    compiled.querySelector('a.details-link').click();

    expect(store.select).toHaveBeenCalled();
    expect(bsService.show).toHaveBeenCalled();
  }));
});
