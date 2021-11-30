import { Component, OnInit } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { YoutubeService } from 'src/app/core/services/youtube/youtube.service';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { MessageService } from 'src/app/core/services/common/message.service';


@Component({
  selector: 'app-live-classes-management',
  templateUrl: './live-classes-management.component.html',
  styleUrls: ['./live-classes-management.component.css'],
  providers: [AdminService, MessageService]
})
export class LiveClassesManagementComponent implements OnInit {
  videoArray: any = [];
  broadcastArray: any = [];
  p: number = 1;
  combinedArray: any = [];
  selectedArray: any = [];
  dm: boolean = false;
  constructor(public afAuth: AngularFireAuth,
    private youTubeService: YoutubeService,
    private adminService: AdminService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.checkForAuth();
    // const tag = document.createElement('script');
    // tag.src = 'https://www.youtube.com/iframe_api';
    // document.body.appendChild(tag);
  }

  checkForAuth() {
    let token = localStorage.getItem('OAuth');
    if (token) {
      this.getYouTubeData(token);
      this.getDatabaseData();
    } else {
      this.GoogleAuth();
    }
  }

  GoogleAuth() {
    let provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
    return this.AuthLogin(provider);
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        if (result.credential) {
          const oauthToken = result.credential['accessToken'];
          localStorage.setItem("OAuth", oauthToken);
          this.getYouTubeData(oauthToken);
        }
        console.log(result, 'You have been successfully logged in!')
      }).catch((error) => {
        console.log(error)
      })
  }

  getDatabaseData() {
    this.adminService.getBroadcasts().subscribe(res => {
      if (res['success']) {
        this.broadcastArray = res['data'];
        this.setfilterforVideo();
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("err", err);
    })
  }

  setfilterforVideo() {
    if (this.broadcastArray.length > 0) {
      this.messageService.showLoader(true);
      let idArray = this.broadcastArray.map(obj => { return obj.id; });
      this.combinedArray = this.videoArray.filter(item => {
        idArray.find(o2 => {
          if (item['id'] == o2) {
            item['dup'] = true;
          }
        })
        if (item['dup'] != true) {
          return item
        }

      })
      this.messageService.showLoader(false);
    }else{
      this.combinedArray = this.videoArray;
    }
    // let flag = false;
    // for (let i = 0; i < this.videoArray.length; i++) {
    //   for (let j = 0; j < this.broadcastArray.length; j++) {
    //     if (this.videoArray[i].id === this.broadcastArray[j].id) {
    //       flag = true;
    //     }
    //   }

    //   if (flag == false) {
    //     this.videoArray[i]['checked'] = false;
    //     let index = this.combinedArray.findIndex(x => x.id==this.videoArray[i].id);
    //     if(index == -1){
    //       this.combinedArray.push(this.videoArray[i]);
    //       this.selectedArray =[];
    //     }
    //   }
    //   flag = false;
    // }
    // console.log("combArr", this.combinedArray);
  }

  getYouTubeData(token) {
    this.messageService.showLoader(true);
    this.youTubeService.getBroadcastData(token).subscribe(res => {
      console.log("resfg",res['items']);
      if (res['items'] && res['items'].length > 0) {
        this.videoArray = res['items'].map(item => {
          let t1 = item.snippet.title.split("-");
          let sub = t1[1].split("(");
          item.t = t1[0]
          item.d = sub[0]
          item.board = sub[1].slice(0, 4)
          return item
        });
        this.messageService.showLoader(false);
        this.setfilterforVideo();
      }
      console.log("res", res);
    }, err => {
      this.messageService.showLoader(false);
      console.log("eer", err);
      if (err) {
        localStorage.removeItem('OAuth');
        this.GoogleAuth();
      }
      console.log("err", err);
    })
  }

  addToDatabase() {
    this.messageService.showLoader(true);
    console.log("db", this.selectedArray);
    this.adminService.addToDatabase(this.selectedArray).subscribe(res => {
      if (res['success']) {
        this.messageService.showLoader(false);
        this.messageService.handleSuccess(res);
        this.selectedArray = [];
        this.getDatabaseData();
        this.showLive();
      }
      console.log("res", res);
    }, err => {
      this.messageService.showLoader(false);
      this.messageService.handleError(err);
      console.log("err", err);
    })
  }

  showDB() {
    this.dm = true;
    this.getDatabaseData();
  }

  showLive() {
    this.dm = false;
    this.setfilterforVideo();
  }

  onVideoSelected(selectedVid, event) {
    if (this.selectedArray.length > 0 && this.selectedArray.find(item => item.id == selectedVid.id)) {
      const index = this.selectedArray.indexOf(selectedVid);
      this.selectedArray.splice(index, 1);
    } else {
      this.selectedArray.push(selectedVid);
      console.log("selected", this.selectedArray);
    }

  }

  CheckAllOptions(optional) {
    if (this.combinedArray.every(val => val.checked == true)) {
      this.combinedArray.forEach(val => { val.checked = false });
      this.selectedArray = [];
    }

    else {
      this.combinedArray.forEach(val => { val.checked = true });
      this.selectedArray = this.combinedArray.filter(item => item);
    }

  }


}

