import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteListComponent } from './routes/components/route-list.component';

const routes: Routes = [
  {
    path: 'routes',
    children: [
      {
        path: '',
        component: RouteListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
