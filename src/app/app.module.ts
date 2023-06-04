import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './pages/patient/patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';
import {  } from '@angular/forms';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ExamEditComponent } from './pages/exam/exam-edit/exam-edit.component';
import { SpecialtyEditComponent } from './pages/specialty/specialty-edit/specialty-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    MedicComponent,
    PatientEditComponent,
    MedicDialogComponent,
    SpecialtyComponent,
    ExamComponent,
    ExamEditComponent,
    SpecialtyEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
