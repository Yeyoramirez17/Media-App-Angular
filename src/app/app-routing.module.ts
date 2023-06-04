import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ExamEditComponent } from './pages/exam/exam-edit/exam-edit.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { SpecialtyEditComponent } from './pages/specialty/specialty-edit/specialty-edit.component';

const routes: Routes = [
  { 
    path: 'pages/patient', component: PatientComponent, 
    children: [
      { path: 'new', component: PatientEditComponent },
      { path: 'edit/:id', component: PatientEditComponent }
    ]
  },
  { 
    path: 'pages/exam', component: ExamComponent, 
    children: [
      { path: 'new', component: ExamEditComponent },
      { path: 'edit/:id', component: ExamEditComponent }
    ]
  },
  { 
    path: 'pages/specialty', component: SpecialtyComponent, 
    children: [
      { path: 'new', component: SpecialtyEditComponent },
      { path: 'edit/:id', component: SpecialtyEditComponent }
    ]
  },
  { path: 'pages/medic', component: MedicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
