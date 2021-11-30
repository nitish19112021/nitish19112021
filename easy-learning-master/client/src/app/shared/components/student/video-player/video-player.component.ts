import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from 'src/app/core/services/student/student.service';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']

})
export class VideoPlayerComponent implements OnInit {
  videoId: string = "";
  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService) {
    this.route.params.subscribe(params => {
      this.videoId = params.id;
    });
  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  onStateChanged(state) {
    if (state.data == 0) {
      if (this.route.snapshot.queryParams["list"] == undefined) {
      this.studentService.updateBroadcast({ broadcastId: this.videoId }).subscribe(res => {
        if (res['success']) {
          this.router.navigate(['/student/live']);
        }
      }, err => {
        console.log("Err", err);
      })
      console.log("ended");
    }
  }

  }

}
