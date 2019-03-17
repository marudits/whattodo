import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// pages
import { PageListComponent } from '../../pages/page-list/page-list.component';

const routes: Routes = [
  {
    path: '',
    component: PageListComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PageListComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PageListModule { 
  static routes = routes;
}
