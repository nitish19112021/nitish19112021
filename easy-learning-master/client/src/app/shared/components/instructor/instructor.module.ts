import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../../layout/layout.module';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorLayoutComponent } from './instructor-layout/instructor-layout.component';

@NgModule({
  declarations: [InstructorDashboardComponent, InstructorLayoutComponent],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    LayoutModule
  ]
})
export class InstructorModule { }
