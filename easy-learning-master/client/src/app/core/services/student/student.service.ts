import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
baseUrl = ApiUrl.baseUrl;
Token:string="";
  constructor(private http: HttpClient) { 
    this.Token =  localStorage.getItem('token').replace(/['"]+/g, '');
  }

  getBroadcasts(classData){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    const classDetails =  {class : classData}
    return this.http.post(`${this.baseUrl}broadcast/getBroadcasts`,classDetails,header);
  }

  updateAcademic(updatedData){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}student/updateStudent`,updatedData,header);
  }

  addSubscription(subscriptionDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}student/addSubscription`,subscriptionDetails,header);
  }

  checkSubscription(subscriptionDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}student/subscriptionStatus`,subscriptionDetails,header);
  }

  updateSubscription(subscriptionDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}student/updateSubscription`,subscriptionDetails,header);
  }

  getSubscribedTeachers(studentDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}student/getSubscriptions`,studentDetails,header);
  }

  updateBroadcast(broadcast){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}broadcast/updateOldBroadcast`,broadcast,header);
  }

  getTeacherOldVideos(teacherDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}broadcast/getOldBroadcasts`,teacherDetails,header);
  }

  getStudentDetails(studentId){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}student/getStudentDetails`,studentId,header);
  }
  
  getLiveBroadcasts(){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.get(`${this.baseUrl}broadcast/getLiveBroadcasts`,header);
  }

  updateStudentProfile(studentDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}student/updateStudentProfile`,studentDetails,header);
  }


}
