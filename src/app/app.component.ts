import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { IUser } from './shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Promo-Tracking';



  constructor(private auth : AuthService){

  }
  ngOnInit(): void{
    // this.auth.checkAuthenticationStatus(this.UserId).subscribe()
  }



}
