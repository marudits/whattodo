import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../page-dashboard/page-dashboard.module#PageDashboardModule'
  }, {
    path: 'auth',
    loadChildren: '../page-auth/page-auth.module#PageAuthModule'
  }, {
    path: 'list',
    loadChildren: '../page-list/page-list.module#PageListModule'
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes) 
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
