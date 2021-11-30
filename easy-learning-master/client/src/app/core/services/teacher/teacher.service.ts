import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  baseUrl = ApiUrl.baseUrl;
  Token:string="";

  constructor(private http: HttpClient) { 
    this.Token =  localStorage.getItem('token');
  }

  getTeacherDetails(teacherDetails){
    return this.http.post(`${this.baseUrl}teacher/getDetails`,teacherDetails);
  }

  getTeacherDetailsById(teacherId){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}teacher/getDetailsById`,teacherId,header);
  }

  getTeacherUpcomingVideos(teacherDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}teacher/myUpcoming`,teacherDetails,header);
  }

  changePassword(passwordDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}teacher/changePassword`,passwordDetails,header);
  }
  
  updateTeacherProfile(teacherDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}teacher/updateTeacher`,teacherDetails,header);
  }

  updateLiveStatus(broadcastDetails){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}broadcast/updateLiveBroadcast`,broadcastDetails,header);
  }

  
}
