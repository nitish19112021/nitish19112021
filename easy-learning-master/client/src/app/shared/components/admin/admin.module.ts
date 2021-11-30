import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutModule } from '../../../layout/layout.module';
import { AngularFireModule } from "@angular/fire";
import { firebaseConfig } from '../../../../environments/environment';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { StudentManagementComponent } from './student-management/student-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TeacherManagementComponent } from './teacher-management/teacher-management.component';
import { LiveClassesManagementComponent } from './live-classes-management/live-classes-management.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CourseManagementComponent } from './course-management/course-management.component';
import { ContentManagementComponent } from './content-management/content-management.component';

@NgModule({
  declarations: [StudentManagementComponent,
    AdminDashboardComponent,
    TeacherManagementComponent,
    LiveClassesManagementComponent,
    AdminLayoutComponent,
    CourseManagementComponent,
    ContentManagementComponent,],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
