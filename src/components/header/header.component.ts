import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: Object = null;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firebaseService.getCurrentUser()
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  handleClick(type: string, params: any){
    switch(type){
      case 'navigate-to':
        this.router.navigate([params]);
        break;
      case 'sign-out':
        this.firebaseService.signOut()
          .then(res => {
            this.router.navigate(['/auth'])
          })
          .catch(err => {
            console.error('Failed on sign out: ', err);
          })
        break;
    }
  }

}
