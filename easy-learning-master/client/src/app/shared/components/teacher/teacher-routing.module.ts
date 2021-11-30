import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { TeacherLibraryComponent } from './teacher-library/teacher-library.component';
import { TeacherLiveClassComponent } from './teacher-live-class/teacher-live-class.component';


const routes: Routes = [{ path: "", component: TeacherLayoutComponent, children:[
  { path: "", redirectTo : 'live' }, 
  { path: 'dashboard', component: TeacherDashboardComponent },
  { path: 'live', component: TeacherLiveClassComponent },
  { path: 'courses', component: TeacherCoursesComponent },
  { path: 'library', component: TeacherLibraryComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
