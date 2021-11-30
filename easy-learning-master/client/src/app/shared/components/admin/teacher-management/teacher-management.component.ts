import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

import { ValidationConfig } from '../../../config/validation';
import { DataConfig } from '../../../config/data.config';
import { MessageService } from 'src/app/core/services/common/message.service';
@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.css'],
  providers: [AdminService, MessageService]
})
export class TeacherManagementComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  teacherData: any = [];
  dropdownList = DataConfig.SubjectList;
  classList = DataConfig.CLASSList;
  boardList = DataConfig.BOARD;
  selectedItems = [];
  selectedItems2 = [];
  selectedItems3 =[];
  dropdownSettings = {};
  subjectArr: any = [];
  classArr: any =[];
  boardArr: any =[];
  stateArr = DataConfig.StateList;
  isEdit: boolean = false;
  subscriptionValue: string = "free";
  p: number = 1;
  emailPattern = ValidationConfig.EMAIL_PATTERN;
  mobilePattern = ValidationConfig.MOB_NO_PATTERN;
  teacherForm = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    address: '',
    city: '',
    state: '',
    qualification: '',
    demoId: '',
    about: ''
  }


  constructor(private adminService: AdminService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAllTeachers();
    this.dropdownList = DataConfig.SubjectList;
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false
    }
    console.log("tt", this.dropdownList);
  }

  getAllTeachers() {
    this.adminService.getAllTeacher().subscribe(res => {
      if (res['success'] && res['data']) {
        this.teacherData = res['data'];
      }
      console.log("teachers", res);
    }, err => {
      this.messageService.handleError(err);
      console.log("err", err);
    })
  }

  addTeacher(tDetails) {
    let teacherDetails = tDetails.form.value;
    console.log("trt", teacherDetails);

    const details = {
      firstName: teacherDetails.firstName,
      lastName: teacherDetails.lastName,
      mobileNo: teacherDetails.mobileNo,
      email: teacherDetails.email,
      address: teacherDetails.address,
      city: teacherDetails.city,
      state: teacherDetails.state,
      qualification: teacherDetails.qualification,
      about: teacherDetails.about,
      subjects: this.subjectArr,
      classes: this.classArr,
      board: this.boardArr,
      subscription: this.subscriptionValue,
      imgUrl:"",
      demoId: teacherDetails.demoId
    }
    console.log("rrt", details);
    this.adminService.addTeacher(details).subscribe(res => {
      if (res['success']) {
        this.closeBtn.nativeElement.click();
        this.messageService.handleSuccess(res);
        this.getAllTeachers();
        this.selectedItems = [];
      }

    }, err => {
      console.log("err", err);
      this.messageService.handleError(err);
    })


  }

  updateTeacher(tDetails) {
    let teacherDetails = tDetails.form.value;
    const details = {
      teacherId: this.teacherForm['_id'],
      firstName: teacherDetails.firstName,
      lastName: teacherDetails.lastName,
      mobileNo: teacherDetails.mobileNo,
      email: teacherDetails.email,
      address: teacherDetails.address,
      city: teacherDetails.city,
      state: teacherDetails.state,
      qualification: teacherDetails.qualification,
      subjects: this.subjectArr,
      classes: this.classArr,
      board: this.boardArr,
      subscription: this.subscriptionValue,
      demoId: teacherDetails.demoId,
      imgUrl:""
    }
    console.log("fg",details);
    this.adminService.updateTeacher(details).subscribe(res => {
      if (res['success']) {
        this.closeBtn.nativeElement.click();
        this.messageService.handleSuccess(res);
        this.getAllTeachers();
      }
    }, err => {
      this.messageService.handleError(err);
      console.log("4446", err);
    })

  }

  onItemSelect(selected) {
    const item = selected.item_text;
    this.subjectArr.push(item);
  }

  onItemSelect2(selected) {
    console.log("re",selected);
    this.classArr.push(selected);
  }

  onItemSelect3(selected) {
    console.log("re",selected);
    this.boardArr.push(selected);
  }

  OnItemDeSelect(selected) {
    this.subjectArr = this.subjectArr.filter(item => {
      return item != selected.item_text
    })
  }

  OnItemDeSelect2(selected) {
    this.classArr = this.classArr.filter(item => {
      return item != selected
    })
    console.log("d2",this.classArr,this.classArr.length>0);
  }

  OnItemDeSelect3(selected) {
    this.boardArr = this.boardArr.filter(item => {
      return item != selected
    })
    console.log("d2",this.boardArr);
  }

  openUpdateModal(teacherDetails) {
    this.isEdit = true;
    this.teacherForm = teacherDetails;
    this.subjectArr = teacherDetails.subjects;
    this.selectedItems = this.dropdownList.filter(o => this.subjectArr.find(o2 => o['item_text'] == o2));
    console.log("tt", this.subjectArr);
  }

  formReset(myForm) {
    if (!this.isEdit) {
      myForm.reset();
      this.teacherForm.state = '';
      this.classArr =[];
      this.subjectArr = [];
      this.boardArr = [];
    }

    if (this.isEdit) {
      this.getAllTeachers();
    }


  }

  onSubscriptionChange(event) {
    let val = event.target.value;
    this.subscriptionValue = val;
  }

  // onstateChange(event){
  //   let state = 
  // }


}
