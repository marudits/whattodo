import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// component
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

// modules
import { SharedModule } from '../shared/shared.module';

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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PageListComponent,
    TodoListComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PageListModule { 
  static routes = routes;
}
