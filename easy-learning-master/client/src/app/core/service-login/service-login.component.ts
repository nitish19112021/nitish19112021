import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneKey } from '../../../environments/environment';

import { ValidationConfig } from '../../shared/config/validation';
import { AuthenticationService } from '../services/auth/authentication.service';
import { MessageService } from '../services/common/message.service';

@Component({
  selector: 'app-service-login',
  templateUrl: './service-login.component.html',
  styleUrls: ['./service-login.component.css'],
  providers: [AuthenticationService, MessageService]
})

export class ServiceLoginComponent implements OnInit {
  selectedRole: string = "";
  sessionId: string = "";
  emailPattern = ValidationConfig.EMAIL_PATTERN;
  passwordPattern = ValidationConfig.PASSWORD_PATTERN;
  mobilepattern = ValidationConfig.MOB_NO_PATTERN;
  enableOTP: boolean = false;
  mobileInput: number;
  otpInput: number;
  serviceDetails = {
    email: "",
    password: ""
  }

  constructor(private authService: AuthenticationService,
    private messageService: MessageService,
    private router: Router) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit() {;
  }

  login() {
    const loginDetails = {
      email: this.serviceDetails.email,
      password: this.serviceDetails.password,
      role: this.selectedRole
    }
    if (this.selectedRole == 'admin') {
      this.authService.adminLogin(loginDetails).subscribe(res => {
        if (res['success']) {
          let token = res['token'];
          localStorage.setItem('token', token);
          this.router.navigate(['/admin']);
          this.messageService.handleSuccess(res);
        }
      }, err => {
        this.messageService.handleError(err);
        console.log("err", err);
      })
    }
    else if (this.selectedRole == 'teacher') {
      this.authService.teacherLogin(loginDetails).subscribe(res => {
        if (res['success']) {
          let token = res['token'];
          let teacherData = res['data'];
          let name = teacherData.firstName + " " + teacherData.lastName;
          localStorage.setItem('token', token);
          localStorage.setItem('name', name)
          localStorage.setItem('userId', teacherData._id)
          this.messageService.handleSuccess(res);
          this.router.navigate(['/teacher']);
        }
      }, err => {
        this.messageService.handleError(err);
        console.log("err", err);
      })
    }
    else {
      this.authService.instructorLogin(loginDetails).subscribe(res => {
        console.log("Res", res);
      }, err => {
        console.log("err", err);
      })
    }
  }

  toggleCheckbox(event) {
    this.selectedRole = event.target.value;
  }

  sendOTP() {
    this.enableOTP = true;
  }



  setupOTP() {
    const phoneNumber = this.mobileInput;
    this.messageService.showLoader(true);
    this.authService.sendOTP(phoneNumber).subscribe(res=>{
      this.messageService.showLoader(false);
      if (res['Status'] === 'Success') {
        this.sessionId = res['Details'];
     }
    },err=>{
      this.messageService.showLoader(false);
      this.messageService.handleError(err.error['Details']);
    })
  }

  doLogin() {
    this.messageService.showLoader(true);
    const otp = this.otpInput;
    this.authService.verifyOTP(this.sessionId,otp).subscribe(res=>{
      if (res['Status'] === 'Success') {
        this.doCommonLogin();
     }
    },err=>{
      this.messageService.showLoader(false);
      this.messageService.handleError(err.error['Details']);
    })

  }

  doCommonLogin() {
    let loginDetails = {
      mobileNo: this.mobileInput
    }
    this.authService.commonMobileLogin(loginDetails).subscribe(res => {
      if (res['success']) {
        this.messageService.showLoader(false);
        if(res['data'][0].role == 'admin'){
          let token = res['token'];
          localStorage.setItem('token', token);
          this.router.navigate(['/admin']);
          this.messageService.handleSuccess(res);
        }else{
          let token = res['token'];
          let teacherData = res['data'][0];
          let name = teacherData.firstName + " " + teacherData.lastName;
          localStorage.setItem('token', token);
          localStorage.setItem('name', name)
          localStorage.setItem('userId', teacherData._id)
          this.messageService.handleSuccess(res);
          this.router.navigate(['/teacher']);
        }

      }
    }, err => {
      this.messageService.showLoader(false);
      this.messageService.handleError(err);
      console.log("Err", err);
    })

  }

}
