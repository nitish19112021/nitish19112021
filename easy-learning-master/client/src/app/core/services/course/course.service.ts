import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrl } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl = ApiUrl.baseUrl + "course/";
  subjectCourseUrl = ApiUrl.baseUrl + "subjectCourse/";
  
  constructor(private http: HttpClient) { }

  addContent(courseDetails) {
    return this.http.post(this.courseUrl + 'addCourse', courseDetails)
  }

  getSubjectCourse(courseData){
    return this.http.post(this.courseUrl + 'getCourse', courseData)
  }

  addsubjectCourse(courseDetails) {
    return this.http.post(this.subjectCourseUrl + 'addCourse', courseDetails)
  }

}
