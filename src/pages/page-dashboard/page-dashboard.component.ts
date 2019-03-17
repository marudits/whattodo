import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { FirebaseService } from '../../services/firebase/firebase.service';

// shared
import { CONSTANTS } from '../../shared/constants';

// utils
import { getUsernameByEmail } from '../../utils/string-formatter';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent implements OnInit {

  currentTime: Date = new Date();
  currentUser: Object = {};

  categorySummary: Object[] = [];
  totalOfTasks: number = 0;
  totalOfCompletedTasks: number = 0;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    // current user
    this.firebaseService.getCurrentUser()
      .subscribe(user => {
        if(user){
          this.currentUser = Object.assign({}, user, { displayName: getUsernameByEmail(user.email) });

          this.loadCategorySummary();
        }
      })
  }

  handleClick(type: string, params: any, options: any){
    switch(type){
      case 'navigate-to':
        this.router.navigate([ params.toLowerCase() ], { queryParams: options })
        break;
    }
  }

  loadCategorySummary(){
    this.firebaseService.getTodo()
      .subscribe(res => {
        this.categorySummary = CONSTANTS.TODO.CATEGORY.map(item => Object.assign({}, item, {
          numOfTasks: res.filter(x => x['category'] === item.key).length || 0,
          numOfCompletedTasks: res.filter(x => x['category'] === item.key && x['is_done']).length || 0
        }));

        this.totalOfTasks = this.categorySummary.map(x => x['numOfTasks']).reduce((a, b) => a + b);
        this.totalOfCompletedTasks = this.categorySummary.map(x => x['numOfCompletedTasks']).reduce((a, b) => a + b);
      })
  }

}
