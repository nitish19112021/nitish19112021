import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../../layout/layout.module';
import { AngularFireModule } from "@angular/fire";
import { firebaseConfig } from '../../../../environments/environment';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from "ngx-spinner";

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentLibraryComponent } from './student-library/student-library.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentTestComponent } from './student-test/student-test.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { StudentLiveClassComponent } from './student-live-class/student-live-class.component';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { TeacherSubscriptionComponent } from './teacher-subscription/teacher-subscription.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { MyTeacherComponent } from './my-teacher/my-teacher.component';


@NgModule({
  declarations: [StudentDashboardComponent, StudentLibraryComponent, StudentCoursesComponent, StudentTestComponent, StudentResultComponent, StudentLiveClassComponent, StudentLayoutComponent,TeacherSubscriptionComponent, VideoPlayerComponent, MyTeacherComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    LayoutModule,
    FormsModule,
    NgxSpinnerModule,
    YouTubePlayerModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers:[NgxSpinnerService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StudentModule { }
