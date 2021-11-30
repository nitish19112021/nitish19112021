import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../../layout/layout.module';
import { NgxSpinnerModule } from "ngx-spinner";

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { TeacherLibraryComponent } from './teacher-library/teacher-library.component';
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { TeacherLiveClassComponent } from './teacher-live-class/teacher-live-class.component';


@NgModule({
  declarations: [TeacherDashboardComponent, TeacherCoursesComponent, TeacherLibraryComponent, TeacherLayoutComponent, TeacherLiveClassComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NgxSpinnerModule,
    LayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeacherModule { }
