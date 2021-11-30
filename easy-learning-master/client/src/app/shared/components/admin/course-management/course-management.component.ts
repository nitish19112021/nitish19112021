import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DataConfig } from '../../../config/data.config';
import { CourseService } from 'src/app/core/services/course/course.service';
import { MessageService } from 'src/app/core/services/common/message.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
  providers: [CourseService, MessageService]
})
export class CourseManagementComponent implements OnInit {
  @ViewChild('inputFile',{static: false}) myInputFile: ElementRef;
  boardList = DataConfig.BOARD;
  classList = DataConfig.CLASSList;
  subjectList: any = DataConfig.Subjects;
  videoURL: '';
  myFile:any;
  isUploaded: boolean = true;
  courseData: any = [];
  topicData: any = [];
  courseForm = {
    class: '',
    board: '',
    subject: '',
    chapter: '',
    topic: '',
    title: '',
    description: '',
  }
  constructor(private courseService: CourseService,
    private storage: AngularFireStorage,
    private messageService: MessageService) { }

  ngOnInit() {

  }

  onSubjectSelect(event) {
    let courseData = {
      class: this.courseForm.class,
      board: this.courseForm.board,
      subject: this.courseForm.subject
    }
    this.courseService.getSubjectCourse(courseData).subscribe(res => {
      if (res['success']) {
        this.courseData = res['data'];
        console.log("Res", res);
      }
    }, err => {
      this.messageService.handleError(err);
    })
    console.log("clicked", event.target.value);
  }

  setTopic(event) {
    let filterData = this.courseData.filter(item => {
      return item.chapter === event.target.value
    })

    if (filterData) {
      this.topicData = filterData[0].topics;
      console.log("ert", event.target.value, this.topicData);
    }

  }

  uploadFile(event) {
    console.log("event", event.target.files[0]);
    const file = event.target.files[0];
    const filePath = `videos/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.put(file);
    task.then((uploadSnapshot) => {
      uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
        this.videoURL = downloadURL;
        this.isUploaded = false;
        console.log(this.videoURL);
      }).catch(err => {
        console.log("err", err);
      })
    })

  }

  addCourse(cForm) {
    let cD = cForm.form.value;
    let courseDetails = {
      class: cD.class,
      board: cD.board,
      subject: cD.subject,
      chapter: cD.chapter,
      topic: cD.topic,
      title: cD.title,
      description: cD.description,
      videoUrL: this.videoURL
    }

    this.courseService.addsubjectCourse(courseDetails).subscribe(res => {
      if (res['success']) {
        this.messageService.handleSuccess(res);
        cForm.reset();
        this.courseForm.class = "";
        this.courseForm.subject = "";
        this.courseForm.board = "";
        this.courseForm.chapter="";
        this.courseForm.topic="";
        this.myInputFile.nativeElement.value = '';
        this.isUploaded =true;
      }
    }, err => {
      this.messageService.handleError(err);
    })
  }



}
