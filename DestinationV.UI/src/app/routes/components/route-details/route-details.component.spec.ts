import { TestBed, async } from '@angular/core/testing';
import { RouteDetailsComponent } from './route-details.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { UserTimezoneDatePipe } from 'src/app/common/pipes/user-timezone-date.pipe';
import { CURRENT_IANA_TIMEZONE } from 'src/app/configs/timezone.config';
import { environment } from 'src/environments/environment.prod';

describe('RouteDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule
      ],
      providers: [
        BsModalRef,
        { provide: CURRENT_IANA_TIMEZONE, useValue: environment.timezone }
      ],
      declarations: [
        RouteDetailsComponent,
        UserTimezoneDatePipe
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(RouteDetailsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should emit a button type 'delete' on button click`, () => {
    const fixture = TestBed.createComponent(RouteDetailsComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.componentInstance.result.subscribe(x => {
      expect(x.buttonType === 'delete').toBeTruthy();
      expect(x.data === undefined).toBeTruthy();
    });

    compiled.querySelector('button.btn-danger').click();
  });

  it(`should emit a button type 'ok' on button click`, () => {
    const fixture = TestBed.createComponent(RouteDetailsComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.componentInstance.result.subscribe(x => {
      expect(x.buttonType === 'ok').toBeTruthy();
      expect(x.data === undefined).toBeTruthy();
    });

    compiled.querySelector('button.btn-primary').click();
  });

  it(`should emit a button type 'edit' on button click`, () => {
    const fixture = TestBed.createComponent(RouteDetailsComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.componentInstance.dto = null;

    fixture.componentInstance.result.subscribe(x => {
      expect(x.buttonType === 'edit').toBeTruthy();
      expect(x.data === null).toBeTruthy();

    });

    compiled.querySelector('button.btn-success').click();
  });
});
