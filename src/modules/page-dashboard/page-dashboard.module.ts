import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// pages
import { PageDashboardComponent } from '../../pages/page-dashboard/page-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PageDashboardComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PageDashboardComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PageDashboardModule { 
  static routes = routes;
}
