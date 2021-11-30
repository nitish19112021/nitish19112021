import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';
import { MessageService } from 'src/app/core/services/common/message.service';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-teacher-subscription',
  templateUrl: './teacher-subscription.component.html',
  styleUrls: ['./teacher-subscription.component.css'],
  providers: [TeacherService, MessageService, StudentService]
})
export class TeacherSubscriptionComponent implements OnInit {
  paramId: any = {};
  teacherData: any = {};
  isSubscribed: boolean = false;
  isUpdated: boolean = false;
  statusCode: number = -1;
  constructor(private router: Router,
    private teacherService: TeacherService,
    private messageService: MessageService,
    private studentService: StudentService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.paramId = params;
    });
  }

  ngOnInit() {
    this.messageService.showLoader(true);
    this.getTeacherDetails();
    this.checkTeacherSubscription();
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  getTeacherDetails() {
    this.teacherService.getTeacherDetailsById(this.paramId).subscribe(res => {
      if (res['success']) {
        this.teacherData = res['data'];
        this.messageService.showLoader(false);
        console.log("tty", this.teacherData);
      }
    }, err => {
      this.messageService.showLoader(false);
      this.messageService.handleError(err);
      console.log("eer", err);
    })

  }

  addSubscription() {
    let subscriptionData = {
      teacherId: this.paramId.id,
      userId: localStorage.getItem('userId')
    }
    this.studentService.addSubscription(subscriptionData).subscribe(res => {
      if (res['success']) {
        this.messageService.handleSuccess(res);
        this.getTeacherDetails();
        this.isSubscribed = true;
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("err", err);
    })
  }

  checkTeacherSubscription() {
    let subscriptionDetails = {
      userId: localStorage.getItem('userId'),
      teacherId: this.paramId.id
    }
    console.log("rtr", subscriptionDetails);
    this.studentService.checkSubscription(subscriptionDetails).subscribe(res => {
      if (res['success']) {
        this.statusCode = res['status'];
      }
    }, err => {
      console.log("err", err);
      this.messageService.handleError(err);
    })
  }

  updateSubscription(){
    let subscriptionData = {
      teacherId: this.paramId.id,
      userId: localStorage.getItem('userId')
    }
    this.studentService.updateSubscription(subscriptionData).subscribe(res => {
      if (res['success']) {
        this.messageService.handleSuccess(res);
        this.isUpdated = true;
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("err", err);
    })
  }

  goLive() {
    this.router.navigateByUrl(`/student/video-player/${this.paramId.vid}`)
  }

}
