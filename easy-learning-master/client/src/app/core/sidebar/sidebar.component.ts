import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[AuthenticationService]
})
export class SidebarComponent implements OnInit {
currentRole :string = "";
  constructor(private authService: AuthenticationService) { 
this.currentRole = this.authService.getCurrentRole();
  }

  ngOnInit() {

  }

}
