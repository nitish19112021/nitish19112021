import { ProfileComponent } from './layout/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ServiceLoginComponent } from './core/service-login/service-login.component';
import { RoleGuard } from './core/guards/role.guard';


const routes: Routes = [
  { path: 'auth/:id', component: AuthenticationComponent },
  { path: 'service-auth', component: ServiceLoginComponent },
  {
    path: "admin",
    loadChildren: "./shared/components/admin/admin.module#AdminModule",
    data: { roles: ['admin'] },
    canActivate: [RoleGuard]
  },
  {
    path: "teacher",
    loadChildren: "./shared/components/teacher/teacher.module#TeacherModule",
    data: { roles: ['teacher'] },
    canActivate: [RoleGuard]
  },
  {
    path: "student",
    loadChildren: "./shared/components/student/student.module#StudentModule",
    data: { roles: ['student'] },
    canActivate: [RoleGuard]
  },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
