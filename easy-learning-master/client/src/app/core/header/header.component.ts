import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthenticationService]
})


export class HeaderComponent implements OnInit {
  userRole: string ="";
  isLogin: boolean = false;
  profileName: string = "Profile Name";
  constructor(private authService: AuthenticationService) {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }


  ngOnInit() {
    this.userRole = this.authService.getCurrentRole();
    const name = localStorage.getItem('name');
    if (name) {
      this.profileName = name;
    }
  }

  gotoProfile(){
    console.log("Ttt");
  }

  logout() {
    this.authService.logout();
  }

}
