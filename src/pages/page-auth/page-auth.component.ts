import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

// shared
import { CONSTANTS } from '../../shared/constants';

@Component({
  selector: 'app-page-auth',
  templateUrl: './page-auth.component.html',
  styleUrls: ['./page-auth.component.scss']
})
export class PageAuthComponent implements OnInit {

  authForm: FormGroup;
  formMode: string = CONSTANTS.AUTH.MODE.SIGN_IN;
  authMode: Object = CONSTANTS.AUTH.MODE;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    // set form
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [ (e) => this.validateForm('email', e) ]
      ],
      password: [
        '',
        [ (e) => this.validateForm('password', e) ]
      ]
    });
  }

  displayError(type: string){
    if (!this.authForm.controls[type]) {
      return null;
    }
    
    const control: AbstractControl = this.authForm.controls[type]
    return control.dirty && control.hasError('message') ? control.errors.message : null
  }
  
  isValid(type: string){
    if (!this.authForm.controls[type]) {
      return false;
    }
  
    const control: AbstractControl = this.authForm.controls[type];
    return control.dirty && control.hasError('status') && control.errors.status !== 'error' ? control.errors.status : false
  }

  formHandle(type: string){
    switch(type){
      case 'submit':
        if(this.isValid('email') && this.isValid('password')){
          this.router.navigate(['/']);
        }
        break;
      case 'reset':
        this.authForm.reset();
        break;
    }
  }

  toggleMode(){
    this.formMode = this.formMode === CONSTANTS.AUTH.MODE.SIGN_IN ? CONSTANTS.AUTH.MODE.SIGN_UP : CONSTANTS.AUTH.MODE.SIGN_IN;
  }

  validateForm(type, form){
    switch(type){
      case 'email':
        const mailReg: RegExp = CONSTANTS.FORM.EMAIL.FORMAT;
        
        if (!mailReg.test(form.value)) {
          return { status: 'error', message: 'Email format is invalid' }
        }
        
        return { status: 'success' }
      case 'password':
        if (!form.value || form.value.trim() === '') {
          return { status: 'error', message: 'Password is required' }
        }
        
        if (form.value.length < CONSTANTS.FORM.PASSWORD.MIN_LENGTH) {
          return { status: 'error', message: `Min ${CONSTANTS.FORM.PASSWORD.MIN_LENGTH} characters` }
        }

        return { status: 'success' }
    }
  }
}
