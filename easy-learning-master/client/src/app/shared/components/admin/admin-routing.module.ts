import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentManagementComponent } from './student-management/student-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TeacherManagementComponent } from './teacher-management/teacher-management.component';
import { LiveClassesManagementComponent } from './live-classes-management/live-classes-management.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { ContentManagementComponent } from './content-management/content-management.component';


const routes: Routes = [{ path: "", component: AdminLayoutComponent, children:[
  { path: '', component: AdminDashboardComponent },
    { path: 'live', component: LiveClassesManagementComponent },
    { path: 'cm', component: CourseManagementComponent },
    { path: 'ct-m', component: ContentManagementComponent },
  { path: 'sm', component: StudentManagementComponent },
  { path: 'tm', component: TeacherManagementComponent}
]

}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
