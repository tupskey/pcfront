import { Component, Inject } from '@angular/core'
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../shared/toastr.service';

@Component({
    selector: 'nav-bard',
    templateUrl: './navbar.component.html',
    styles: [
        `
        .rock{background-color: navy; color: white}
        a.nav-link{color: white; ; font-size: 19px}
        a.nav-brand{color: white; font-size: 19px}
        a.active{color:navy; background-color: white;font-size: 19px}
        navbar{color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        `
    ]
})

export class NavBarComponent{


  constructor(public auth : AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){

  }
  logOut(){
    this.auth.logOut()
      this.router.navigate(['/']);
      this.toastr.error('You have succesfully logged out!!!')
  }
}
