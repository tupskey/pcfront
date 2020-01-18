import { Component, OnInit, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  username:string;
  password:string;
  mouseoverLogin
  InvalidLogin : boolean = false;



  constructor(private auth : AuthService, private router : Router, private elementRef: ElementRef ) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
 }

  Login(formValue){
    this.auth.loginUser(formValue.username, formValue.password).subscribe(resp => {
      if(!resp){
        this.InvalidLogin = true
      }
      else{
        this.auth.setUserInfo({'user': resp['user']})
        this.router.navigate(['dashboard']);
      }
    })

  }

}
