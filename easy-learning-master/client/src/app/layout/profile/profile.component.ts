import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ValidationConfig } from '../../shared/config/validation';
import { DataConfig } from '../../shared/config/data.config';
import { MessageService } from 'src/app/core/services/common/message.service';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthenticationService, MessageService, TeacherService, StudentService]
})
export class ProfileComponent implements OnInit {
  profileName: string = "Profile Name";
  userRole: string = "";
  classList = DataConfig.CLASSList;
  disableForm: boolean = true;
  passwordPattern = ValidationConfig.PASSWORD_PATTERN;
  emailPattern = ValidationConfig.EMAIL_PATTERN;
  mobilePattern = ValidationConfig.MOB_NO_PATTERN;
  profileData: any = {};
  passwordData = {
    currentPassword: '',
    newPassword: ''
  }


  constructor(private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private studentService: StudentService,
    private teacherService: TeacherService) {
    this.userRole = this.authenticationService.getCurrentRole();
    this.profileName = localStorage.getItem('name')
  }

  ngOnInit() {
    this.messageService.showLoader(true);
    this.getProfileData();
  }


  getProfileData() {
    let profileData = {
      userId: localStorage.getItem('userId'),
      role: this.userRole
    }
    this.authenticationService.getProfileData(profileData).subscribe(res => {
      if (res['success']) {
        this.messageService.showLoader(false);
        this.profileData = res['data'][0];
        if (this.userRole == 'teacher') {
          this.profileData.name = this.profileData.firstName + " " + this.profileData.lastName;
        }

      }
      console.log("res", res);
    }, err => {
      this.messageService.showLoader(false);
      this.messageService.handleError(err);
      console.log("err", err);
    })
  }

  changePassword(passForm) {
    let passwordDetails = {
      userId: localStorage.getItem('userId'),
      currentPassword: this.passwordData.currentPassword,
      newPassword: this.passwordData.newPassword
    }
    console.log("tty", passwordDetails);
    this.teacherService.changePassword(passwordDetails).subscribe(res => {
      this.messageService.showLoader(true);
      if (res['success']) {
        this.messageService.showLoader(false);
        this.messageService.handleSuccess(res);
        passForm.reset();
      }
      console.log("res", res);
    }, err => {
      this.messageService.showLoader(false);
      this.messageService.handleError(err);
      console.log("err", err);
    })
  }

  updateStudent(studentForm) {
    let formDetails = studentForm.form.value;
    console.log("form",formDetails);
    let studentDetails = {
      userId: localStorage.getItem('userId'),
      email: formDetails.email,
      gender: this.profileData.gender,
      city: formDetails.city,
      class: this.profileData.class,
      board: this.profileData.board,
      name: formDetails.name,
      mobileNo: formDetails.mobileNo
    }
    console.log("ff",studentDetails);
    this.messageService.showLoader(true);
    this.studentService.updateStudentProfile(studentDetails).subscribe(res => {
      if (res['success']) {
        this.messageService.handleSuccess(res);
        this.disableForm = true;
        this.getProfileData();
      }
    }, err => {
      this.messageService.showLoader(false)
      this.messageService.handleError(err)
      console.log("TfF", err);
    })

  }

  updateTeacher(teacherForm) {
    let formDetails = teacherForm.form.value;
    let teacherDetails = {
      userId: localStorage.getItem('userId'),
      email: formDetails.email,
      gender: formDetails.gender,
      city: formDetails.city,
      mobileNo: formDetails.mobileNo,
      about: formDetails.about,
      demoId: formDetails.demoId
    }
    this.messageService.showLoader(true);
    this.teacherService.updateTeacherProfile(teacherDetails).subscribe(res => {
      if (res['success']) {
        this.messageService.handleSuccess(res);
        this.disableForm = true;
        this.getProfileData();
      }
    }, err => {
      this.messageService.showLoader(false)
      this.messageService.handleError(err)
      console.log("TfF", err);
    })

  }

  logout() {
    this.authenticationService.logout();
  }

}
