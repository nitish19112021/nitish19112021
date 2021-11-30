import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { YoutubeService } from 'src/app/core/services/youtube/youtube.service';

import { DataConfig } from '../../../config/data.config';
import { StudentService } from 'src/app/core/services/student/student.service';
import { MessageService } from 'src/app/core/services/common/message.service';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';


@Component({
  selector: 'app-student-live-class',
  templateUrl: './student-live-class.component.html',
  styleUrls: ['./student-live-class.component.css'],
  providers: [YoutubeService, StudentService, MessageService, TeacherService]
})
export class StudentLiveClassComponent implements OnInit {
  @ViewChild('openModal', { static: false }) openModal: ElementRef
  videoArray: any = [];
  BoardFilter2: any = [];
  liveVideoArray: any = [];
  filterArray: any = [];
  filterArray2: any = [];
  subjectList: any = DataConfig.Subjects;
  SubjectFilter: any = "";
  SubjectFilter2: any = "";
  languageFilter: any = "";
  BoardFilter: any = "";
  studentInfo: any = {};
  boardList = DataConfig.BOARD;
  classList = DataConfig.CLASSList;
  academicDetails = {
    name: "",
    board: "",
    class: "",
  }

  constructor(public afAuth: AngularFireAuth,
    private youTubeService: YoutubeService,
    private studentService: StudentService,
    private messageService: MessageService,
    private teacherService: TeacherService,
    private router: Router) {
    this.getUserDetails();

  }

  ngOnInit() {
    this.messageService.showLoader(true);
  }

  addAcademic(myform) {
    let studentDetails = {
      userId: localStorage.getItem('userId'),
      name: myform.form['value'].name,
      class: myform.form['value'].class,
      board: myform.form['value'].board
    }
    this.studentService.updateAcademic(studentDetails).subscribe(res => {
      if (res['success']) {
        this.messageService.handleSuccess(res);
        this.getUserDetails();
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("err", err);
    })
    console.log("gg", myform.form['value']);
  }

  getUserDetails() {
    let studentData = {
      userId: localStorage.getItem('userId')
    }
    this.studentService.getStudentDetails(studentData).subscribe(res => {
      if (res['success']) {
        let studentData = res['data'];
        this.messageService.showLoader(false);
        if (studentData.name && studentData.role) {
          localStorage.setItem('name', studentData.name);
          this.studentInfo = res['data'];
          this.getLiveBroadcasts();
          this.getMyBroadcasts();
        }
        else {
          this.openModal.nativeElement.click();
        }

      }
    }, err => {
      this.messageService.showLoader(false);
      this.messageService.handleError(err);
      console.log("ere", err);
    })
  }

  getLiveBroadcasts() {
    this.studentService.getLiveBroadcasts().subscribe(res => {
      if (res['success']) {
        this.liveVideoArray = res['data'];
        this.filterArray2 = res['data'];
      }

    }, err => {
      this.messageService.handleError(err);
      console.log("err", err);
    })
  }

  getMyBroadcasts() {
    let cass = this.studentInfo.class;
    this.studentService.getBroadcasts(cass).subscribe(res => {
      if (res['success']) {
        this.videoArray = res['data'];
        this.filterArray = res['data'];
      }
    }, err => {
      this.messageService.handleError(err);
    })
  }

  onBoardChange(event) {

  }

  onBoardChange2(event) {

  }

  onSubjectChange(event) {
    let key = event.target.value;
    if (key == "") {
      this.videoArray = this.filterArray;
    }
    else {
      this.videoArray = this.filterArray.filter(item => {
        return item.d == key
      })
    }
  }

  onSubjectChange2(event) {
    let key = event.target.value;
    if (key == "") {
      this.liveVideoArray = this.filterArray2;
    }
    else {
      this.liveVideoArray = this.filterArray2.filter(item => {
        return item.d == key
      })
    }
  }

  onLanguageChange(event) {
    let key = event.target.value;
  }

  openSubscription(videoData) {

    let teacherDetails = {
      "firstName": videoData.snippet.description.split(" ")[0],
      "lastName": videoData.snippet.description.split(" ")[1],
      "subjects": videoData.d,
      "classes": videoData.t
    }

    this.teacherService.getTeacherDetails(teacherDetails).subscribe(res => {
      if (res['success']) {
        console.log("rre", res['data']);
        let teacherId = res['data']._id;
        this.checkSubscription(teacherId, videoData.id);
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("eer", err);
    })
  }

  checkSubscription(teacherID, videoID) {
    let subscriptionDetails = {
      userId: localStorage.getItem('userId'),
      teacherId: teacherID
    }
    this.studentService.checkSubscription(subscriptionDetails).subscribe(res => {
      if (res['success']) {
        if (res['status'] == 1) {
          this.router.navigateByUrl(`/student/subscription/${teacherID}/${videoID}`);
        } else if (res['status'] == 2) {
          this.router.navigateByUrl(`/student/subscription/${teacherID}/${videoID}`);
        }
        else if (res['status'] == 0) {
          this.router.navigateByUrl(`/student/video-player/${videoID}`);
          console.log("subscribed");
        }
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("er", err);
    })
  }


}







// {
//   "_id" : ObjectId("5f043ba4d8c99a309c2a7182"),
//   "snippet" : {
//       "thumbnails" : {
//           "default" : {
//               "url" : "https://i.ytimg.com/vi/XX-3p3b9XFc/default_live.jpg",
//               "width" : 120,
//               "height" : 90
//           },
//           "medium" : {
//               "url" : "https://i.ytimg.com/vi/XX-3p3b9XFc/mqdefault_live.jpg",
//               "width" : 320,
//               "height" : 180
//           },
//           "high" : {
//               "url" : "https://i.ytimg.com/vi/XX-3p3b9XFc/hqdefault_live.jpg",
//               "width" : 480,
//               "height" : 360
//           },
//           "standard" : {
//               "url" : "https://i.ytimg.com/vi/XX-3p3b9XFc/sddefault_live.jpg",
//               "width" : 640,
//               "height" : 480
//           },
//           "maxres" : {
//               "url" : "https://i.ytimg.com/vi/XX-3p3b9XFc/maxresdefault_live.jpg",
//               "width" : 1280,
//               "height" : 720
//           }
//       },
//       "publishedAt" : "2020-06-26T02:50:13Z",
//       "title" : "class 8-Science",
//       "description" : "Vijay Goel",
//       "scheduledStartTime" : "2020-06-29T03:05:00Z",
//       "liveChatId" : "Cg0KC1hYLTNwM2I5WEZjKicKGFVDNGNUcG1OaEZxUUxxR1FOSW9UVF9fURILWFgtM3AzYjlYRmM"
//   },
//   "id" : "XX-3p3b9XFc",
//   "t" : "Class 8",
//   "d" : "Science",
//   "creationDate" : ISODate("2020-07-07T09:08:52.337Z"),
//   "updationDate" : ISODate("2020-07-07T09:08:52.338Z"),
//   "__v" : 0
// }