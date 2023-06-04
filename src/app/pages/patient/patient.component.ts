import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service'

@Component({ 
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions'];
  patients : MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private patientService: PatientService,
    private _snackBar: MatSnackBar) 
  {}
  
  ngOnInit(): void {
    // Recupera los datos de la variable reactiva
    // Se invoca solo cuando detecta un next
    this.patientService.getPatientChange().subscribe(data => {
      this.createTable(data);
    });

    this.patientService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration:2000, verticalPosition:'top'});
    });

    this.patientService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(event: any) {
    this.patients.filter = event.target.value.trim();
  }

  createTable(data: Patient[]) {
    this.patients = new MatTableDataSource(data);
    this.patients.paginator = this.paginator;
    this.patients.sort = this.sort;
  }

  delete(idPatient: number) {
    this.patientService.delete(idPatient).pipe(switchMap( () => {
      return this.patientService.findAll();
    }))
    .subscribe(data => {
      this.patientService.setPatientChange(data);
      this.patientService.setMessageChange('Patient delected successfully');
    });
  }
}
