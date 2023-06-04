import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {
  
  public idPatient: number;
  private isEdit: boolean;
  public form : FormGroup;

  constructor(
    private route : ActivatedRoute,
    private servicePatient : PatientService,
    private router : Router) 
    { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      idPatient : new FormControl(0),
      firstName : new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName : new FormControl('', [Validators.required, Validators.minLength(3)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address : new FormControl(''),
      phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.route.params.subscribe(data => {
      this.idPatient = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }
  
  initForm() {
    if(this.isEdit) {
      this.servicePatient.findById(this.idPatient).subscribe(data => {
        this.form = new FormGroup ({
          idPatient : new FormControl(data.idPatient),
          firstName : new FormControl(data.firstName, [Validators.required, Validators.minLength(3)]),
          lastName : new FormControl(data.lastName, [Validators.required, Validators.minLength(3)]),
          dni: new FormControl(data.dni, [Validators.required, Validators.minLength(8)]),
          address : new FormControl(data.address),
          phone: new FormControl(data.phone, [Validators.required, Validators.minLength(9)]),
          email: new FormControl(data.email, [Validators.required, Validators.email])
        });
      });
    }
  }

  operate() {
    if(this.form.invalid) {
      return;
    }
    
    const patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dni = this.form.value['dni'];
    patient.address = this.form.value['address'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email'];

    if(this.isEdit) {
      // Update Patient
      this.servicePatient.update(patient, this.idPatient).subscribe(data => {
        this.servicePatient.findAll().subscribe(data => {
          this.servicePatient.setPatientChange(data);
          this.servicePatient.setMessageChange('Patient updated successfully');
        });
      });
    } else {
      // Insert patient
      // Practica Ideal
      this.servicePatient.save(patient).pipe(switchMap(() => {
        return this.servicePatient.findAll();
      })).subscribe(data => {
        this.servicePatient.setPatientChange(data);
        this.servicePatient.setMessageChange('Patient created successfully');
      });
    }
    this.router.navigate(['/pages/patient']);
  }

  get f() {
    return this.form.controls;
  }
}
