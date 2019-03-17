import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-category',
  templateUrl: './todo-category.component.html',
  styleUrls: ['./todo-category.component.scss']
})
export class TodoCategoryComponent implements OnInit {

  @Input() name: string;
  @Input() icon: string;

  @Input() numOfTasks: number;
  @Input() numOfCompletedTasks: number;

  percentageCompleted: number;

  constructor() { }

  ngOnInit() {
    this.percentageCompleted = this.numOfCompletedTasks !== 0 ? this.numOfCompletedTasks / this.numOfTasks * 100 : 0;
  }

}
