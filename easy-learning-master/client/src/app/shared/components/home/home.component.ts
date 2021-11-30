import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AuthenticationService]
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private router: Router) { 
    if (localStorage.getItem('token')) {
      let route = '/' + this.authService.getCurrentRole();
      this.router.navigate([route]);
    }

  }

  ngOnInit() {
  }

}
