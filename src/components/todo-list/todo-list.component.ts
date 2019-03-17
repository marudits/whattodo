import { Component, OnInit, Input } from '@angular/core';

// services
import { FirebaseService } from '../../services/firebase/firebase.service';

// shared
import { TodoItem } from '../../shared/interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todoList: Array<TodoItem> = [];

  activeItem: string[] = ['0'];

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  handleClick(type: string, params, options){
    switch(type){
      case 'set-active-item':
        this.activeItem = params;
        break;
      case 'toggle-is-done':
        this.firebaseService.updateTodo(params.id, { is_done: !params.is_done });
        break;
      case 'item-removed':
        this.firebaseService.removeTodo(params.id);
        break;
    }
  }

}