import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/core/services/student/student.service';
import { MessageService } from 'src/app/core/services/common/message.service';


@Component({
  selector: 'app-my-teacher',
  templateUrl: './my-teacher.component.html',
  styleUrls: ['./my-teacher.component.css'],
  providers: [MessageService]
})
export class MyTeacherComponent implements OnInit {
  showTeachers: boolean = true;
  teacherArray: any = [];
  videoList: any = [];
  constructor(private studentService: StudentService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getMyTeachers();
  }

  getMyTeachers() {
    let studentDetails = {
      userId: localStorage.getItem('userId')
    }
    this.studentService.getSubscribedTeachers(studentDetails).subscribe(res => {
      if (res['success']) {
        this.teacherArray = res['data'].subscriptions;
        console.log("res", res);
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("er", err);
    })
  }

  openvideoList(teacherData) {
    let tName = teacherData.teacherId.firstName + " " + teacherData.teacherId.lastName;
    let subj = [...teacherData.teacherId.subjects];

    const teacherDetails = {
      teacherName: tName,
      subject: subj
    }
    this.studentService.getTeacherOldVideos(teacherDetails).subscribe(res => {
      if (res['success']) {
        this.videoList = res['data'];
        this.showTeachers = false;
      }
      console.log("resd", res);
    }, err => {
      this.messageService.handleError(err);
      console.log("eret", err);
    })
  }


}
