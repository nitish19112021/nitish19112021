import { Component, OnInit } from '@angular/core';
import { DataConfig } from '../../../config/data.config';

import { MessageService } from 'src/app/core/services/common/message.service';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css'],
  providers: [MessageService, CourseService]
})
export class ContentManagementComponent implements OnInit {
  // topicArray: any = [];
  countNumber: number = -1;
  boardList = DataConfig.BOARD;
  classList = DataConfig.CLASSList;
  subjectList: any = DataConfig.Subjects;
  contentDetails = {
    subject: "",
    board: "",
    class: "",
    chapter: "",
    topicArray: []
  }
  constructor(private messageService: MessageService,
    private courseService: CourseService) { }

  ngOnInit() {
  }

  addTopic() {
    this.countNumber = this.countNumber + 1;
    console.log("Couter", this.countNumber, this.contentDetails.topicArray);
    this.contentDetails.topicArray.push({ id: this.countNumber, name: "" });
  }

  afterInsert(event, id) {
    const i = this.contentDetails.topicArray.findIndex(item => item.id === id);
    this.contentDetails.topicArray[i].name = event.target.value
    console.log("yt", this.contentDetails.topicArray);
  }

  removeTopic(id) {
    this.contentDetails.topicArray.splice(id, 1);
    this.resetArray(id);
    this.countNumber = this.countNumber -1;
    console.log("tt", this.contentDetails.topicArray);
  }

  resetArray(id) {
    this.contentDetails.topicArray = this.contentDetails.topicArray.map((item, index) => {
      if (item.id > id) {
        item.id = item.id - 1;
        return item
      }
      return item
    })
    console.log("hij", this.contentDetails.topicArray);
  }

  addContent(contentForm){
console.log("cf", contentForm.form.value, this.contentDetails);
this.courseService.addContent(this.contentDetails).subscribe(res=>{
if(res['success']){
  this.messageService.handleSuccess(res);
  contentForm.reset();
  this.contentDetails.subject="";
  this.contentDetails.board="";
  this.contentDetails.class="";
  console.log("res",res);
}
},err=>{
this.messageService.handleError(err);
console.log("err",err);
})
  }

}
