import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrl, PhoneKey } from '../../../../environments/environment';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  studentUrl = ApiUrl.baseUrl + "student/";
  adminUrl = ApiUrl.baseUrl + "admin/"
  teacherUrl = ApiUrl.baseUrl + "teacher/"
  instructorUrl = ApiUrl.baseUrl + "instructor/"
  commonUrl = ApiUrl.baseUrl + "common/"
  templateName = 'compactgyan';
  constructor(private router: Router, public http: HttpClient) { }

  sendOTP(mobileNo){
    return this.http.get(`https://2factor.in/API/V1/${PhoneKey.key}/SMS/${mobileNo}/AUTOGEN/${this.templateName}`);
  }

  verifyOTP(sessionId,OTP){
    return this.http.get(`https://2factor.in/API/V1/${PhoneKey.key}/SMS/VERIFY/${sessionId}/${OTP}`);
  }  


  afterLogin(loginDetails) {
    return this.http.post(this.studentUrl + 'login', loginDetails)
  }

  onRegister(registerDetails) {
    return this.http.post(this.studentUrl + 'register', registerDetails)
  }


  adminLogin(loginDetails) {
    return this.http.post(this.adminUrl + 'login', loginDetails)
  }

  teacherLogin(loginDetails) {
    return this.http.post(this.teacherUrl + 'login', loginDetails)
  }

  instructorLogin(loginDetails) {
    return this.http.post(this.instructorUrl + 'login', loginDetails)
  }

  commonMobileLogin(loginDetails){
    return this.http.post(this.commonUrl + 'login', loginDetails)
  }
  
  getProfileData(profileDetails){
    return this.http.post(this.commonUrl + 'getProfile', profileDetails)
  }

  getCurrentRole(){
if(localStorage.getItem('token')){
  const token = localStorage.getItem('token');
  const tokenPayload = decode(token);
  return tokenPayload.role
}
 }

 logout(){
   localStorage.clear();
  //  if(this.getCurrentRole()=='student'){
  //   localStorage.clear();
  //   this.router.navigate(['/auth']);
  //  }
  //  else{
  //   localStorage.clear();
  //   this.router.navigate(['/service-auth']);
  //  }

}




}
