import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = ApiUrl.baseUrl;
  Token:string="";
  constructor(private http: HttpClient) {
    this.Token =  localStorage.getItem('token').replace(/['"]+/g, '');
   }

  getAllTeacher(){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.get(`${this.baseUrl}admin/getAllTeacher`,header);
  }

  addTeacher(teacherData){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}admin/addTeacher`,teacherData,header);
  }

  updateTeacher(teacherData){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.post(`${this.baseUrl}admin/updateTeacher`,teacherData,header);
  }

  getAllStudent(){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.Token}` )
    }
    return this.http.get(`${this.baseUrl}admin/getAllStudent`,header);
  }

  addToDatabase(broadcastData){
    return this.http.post(`${this.baseUrl}admin/addBroadcast`, broadcastData);
  }

  getBroadcasts(){
    return this.http.get(`${this.baseUrl}broadcast/getAllBroadcasts`);
  }



}
