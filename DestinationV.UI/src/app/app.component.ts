import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'destinationv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<boolean> = new Subject<boolean>();
  isCollapsed = true;
  currentRoute: string = null;


  constructor(private router: Router) {

  }

  changeActiveRoute(name: string) {
    this.currentRoute = name;
  }

  ngOnInit() {
    this.router.events.pipe(filter(route => route instanceof NavigationEnd), takeUntil(this.unsubscribe)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url.replace('/', '');
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
