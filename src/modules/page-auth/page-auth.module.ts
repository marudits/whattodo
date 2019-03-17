import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// pages
import { PageAuthComponent } from '../../pages/page-auth/page-auth.component';

const routes: Routes = [
  {
    path: '',
    component: PageAuthComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PageAuthComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PageAuthModule { 
  static routes = routes;
}
