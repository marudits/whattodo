import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// components
import { TodoCategoryComponent } from '../../components/todo-category/todo-category.component';

// modules
import { SharedModule } from '../shared/shared.module';

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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PageDashboardComponent,
    TodoCategoryComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PageDashboardModule { 
  static routes = routes;
}
