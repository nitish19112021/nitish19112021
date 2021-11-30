import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/common/message.service';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-live-class',
  templateUrl: './teacher-live-class.component.html',
  styleUrls: ['./teacher-live-class.component.css'],
  providers: [MessageService, TeacherService]
})
// https://studio.youtube.com/video/sn_jDDQsRFU/livestreaming
export class TeacherLiveClassComponent implements OnInit {
  videoArray: any = [];
  constructor(private teacherService: TeacherService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.showLoader(true);
    this.getliveDetails();
  }

  getliveDetails() {
    let teacherDetails = {
      userId: localStorage.getItem('userId'),
      name: localStorage.getItem('name')
    }
    this.teacherService.getTeacherUpcomingVideos(teacherDetails).subscribe(res => {
      if (res['success']) {
        this.videoArray = res['data'].sort((a,b)=>{
          return <any>new Date(b.snippet.scheduledStartTime) - <any>new Date(a.snippet.scheduledStartTime) 
        });
        this.videoArray = this.videoArray.reverse();
        this.messageService.showLoader(false);
      }
      console.log("res", res);
    }, err => {
      this.messageService.showLoader(false)
      this.messageService.handleError(err)
      console.log("err", err);
    })
  }

  openLive(video) {
    let broadCastDetails = {
      broadcastId: video._id
    }
    this.teacherService.updateLiveStatus(broadCastDetails).subscribe(res => {
      if (res['success']) {
        let url = `https://studio.youtube.com/video/${video.id}/livestreaming`;
        window.open(url);
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("err", err);
    })
    return

  }


}
