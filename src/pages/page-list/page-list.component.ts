import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// library
import { ElMessageService } from 'element-angular';

// services
import { FirebaseService } from '../../services/firebase/firebase.service';

// shared
import { CONSTANTS } from '../../shared/constants';
import { TodoItem } from '../../shared/interface';

// utils
import { getCategoryByKey } from '../../utils/string-formatter';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  categoryName: string = 'all';
  categoryInfo: Object = {};
  categoryList: Object[] = CONSTANTS.TODO.CATEGORY;

  todoList: Array<TodoItem> = [];
  filteredList: Array<TodoItem> = [];

  listState: string = 'all';
  listStateTotalInfo: Object = {}

  dialog: any = {
    is_visible: false,
    type: null,
    title: null,
    data: {}
  }

  todoForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private message: ElMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    // current user
    this.firebaseService.getCurrentUser()
      .subscribe(user => {
        if(user){
          
          // fetch data
          this.activatedRoute.queryParams.subscribe(queryParams => {
            this.categoryName = queryParams['type'] || 'all';
            this.categoryInfo = getCategoryByKey(this.categoryName);

            this.loadTodoList(this.listState);
          });

          // setup form
          this.todoForm = this.formBuilder.group({
            title: [
              '',
              [ Validators.required ]
            ],
            description: [
              '',
              []
            ],
            category: [
              this.categoryName !== 'all' ? this.categoryName : '',
              [ Validators.required ]
            ]
          });
          
        } else {
          this.router.navigate(['auth']);
        }
      })
  }

  handleClick(type: string, params){
    switch(type){
      case 'filter-list':
        this.listState = params;

        switch(params){
          case 'all':
            this.filteredList = this.todoList;
            break;
          case 'completed':
            this.filteredList = this.todoList.filter(x => x.is_done);
            break;
          case 'uncompleted':
            this.filteredList = this.todoList.filter(x => !x.is_done);
            break;
        }

        this.listStateTotalInfo = {
          all: this.todoList.length,
          completed: this.todoList.filter(x => x.is_done).length,
          uncompleted: this.todoList.filter(x => !x.is_done).length,
        }

        break;
      case 'dialog-add-item':
        this.dialog = {
          is_visible: true,
          type: 'add-item',
          title: 'Add New Item',
          data: {
            title: null,
            description: null
          }
        };
        break;
      case 'confirm-add-item':

        if(!this.todoForm.valid){
          return;
        }
        
        // add item
        let payload = {
          created_at: new Date().getTime(),
          title: this.todoForm.value.title,
          description: this.todoForm.value.description,
          category: this.todoForm.value.category,
          is_done: false,
          created_by: this.firebaseService.isAuthenticated().uid
        };

        this.firebaseService.addTodo(payload)
          .then(res => {
            // reset form
            this.todoForm.reset();

            // close modal
            this.dialog = {
              is_visible: false,
              type: null,
              title: null,
              data: {}
            };

            this.message.success('Successfully add todo item!');
          })
          .catch(err => {
            console.error('Failed on add todo: ', err);
            this.message.error(err.message || 'Failed on add todo');
          });

        break;
      case 'reset-form':
        this.todoForm.reset();
        break;
    }
  }

  loadTodoList(listState: string = 'all'){
    this.firebaseService.getTodo()
      .subscribe(res => {
        this.todoList = res.filter(item => this.categoryName !== 'all' ? item['category'] === this.categoryName : true);
        this.handleClick('filter-list', listState);
      });
  }

}
