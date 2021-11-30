import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/core/services/admin/admin.service';
import { MessageService } from 'src/app/core/services/common/message.service';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css'],
  providers: [AdminService, MessageService]
})

export class StudentManagementComponent implements OnInit {
studentData:any = [];
p: number = 1;

  constructor(private adminService: AdminService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents(){
this.adminService.getAllStudent().subscribe(res=>{
  if(res['success']){
this.studentData = res['data'];
this.messageService.handleSuccess(res);
  }
},err=>{
  this.messageService.handleError(err);
})
  }

}
