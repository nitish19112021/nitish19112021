import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentLiveClassComponent } from './student-live-class/student-live-class.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentLibraryComponent } from './student-library/student-library.component';
import { StudentTestComponent } from './student-test/student-test.component';
import { TeacherSubscriptionComponent } from './teacher-subscription/teacher-subscription.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { MyTeacherComponent } from './my-teacher/my-teacher.component';


const routes: Routes = [{ path: "", component: StudentLayoutComponent, children:[
  { path: "", redirectTo : 'live' }, 
  { path: "dashboard", component: StudentDashboardComponent },
  { path: 'live', component: StudentLiveClassComponent },
  { path: 'courses', component: StudentCoursesComponent },
  { path: 'library', component: StudentLibraryComponent },
  { path: 'test', component: StudentTestComponent },
  { path: 'subscription/:id/:vid', component: TeacherSubscriptionComponent },
  { path: 'video-player/:id', component: VideoPlayerComponent },
  { path: 'myteacher', component: MyTeacherComponent }
    
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
