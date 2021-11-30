import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';

import { ValidationConfig } from '../../shared/config/validation';

import { AuthenticationService } from '../services/auth/authentication.service';
import { MessageService } from '../services/common/message.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [MessageService]
})
export class AuthenticationComponent implements OnInit {
  isSignup: boolean = false;
  mobileInput: number;
  otpInput: number;
  sessionId: string = "";
  mobilepattern = ValidationConfig.MOB_NO_PATTERN;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private messageService: MessageService) {
    this.route.params.subscribe(params => {
      let key = params.id;
      if (key == 'register') {
        this.isSignup = true;
      }
    });
  }

  ngOnInit() {
  }

  sendOTP() {
    const phoneNumber = this.mobileInput;
    this.authService.sendOTP(phoneNumber).subscribe(res => {
      if (res['Status'] === 'Success') {
        this.sessionId = res['Details'];
      }
    }, err => {
      console.log("Err", err);
      this.messageService.handleError("Bad Request");
    })
  }

  registerUser(userDetails) {
    const otp = userDetails.form['value'].otpInput;
    this.authService.verifyOTP(this.sessionId, otp).subscribe(res => {
      if (res['Status'] === 'Success') {
        const registerDetails = { "mobileNo": userDetails.form['value'].mobileInput }
        this.authService.onRegister(registerDetails).subscribe(res => {
          if (res && res['success']) {
            this.messageService.handleSuccess(res);
            this.isSignup = !this.isSignup;
            userDetails.reset();
          }
        }, err => {
          console.log("rrr", err);
          this.messageService.handleError(err);
        })
      }
    }, err => {
      console.log("Err", err);
      this.messageService.showLoader(false);
      this.messageService.handleError(err.error['Details']);
    })
  }


  doLogin(loginDetails) {
    this.messageService.showLoader(true);
    const otp = loginDetails.form['value'].otpInput;
    this.authService.verifyOTP(this.sessionId, otp).subscribe(res => {
      if (res['Status'] === 'Success') {
        this.enableLogin(loginDetails)
      }
    }, err => {
      console.log("Err", err);
      this.messageService.showLoader(false);
      this.messageService.handleError(err.error['Details']);
    })
  }

  enableLogin(loginDetails) {
    const details = { "mobileNo": loginDetails.form['value'].mobileInput }
    this.authService.afterLogin(details).subscribe(res => {
      if (res && res['success']) {
        this.messageService.showLoader(false);
        let token = res['token'];
        localStorage.setItem("token", token);
        localStorage.setItem("userId", res['userId']);
        this.router.navigate(['/student']);
        this.messageService.handleSuccess(res);
      }
    }, err => {
      console.log("err", err);
      this.messageService.showLoader(false);
      this.messageService.handleError(err);
    })
  }


  toggleAuth(form) {
    this.isSignup = !this.isSignup;
    form.reset();
  }


}
