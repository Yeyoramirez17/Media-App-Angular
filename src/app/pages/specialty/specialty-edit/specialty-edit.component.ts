import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Specialty } from 'src/app/model/specialty';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-specialty-edit',
  templateUrl: './specialty-edit.component.html',
  styleUrls: ['./specialty-edit.component.css']
})
export class SpecialtyEditComponent implements OnInit {
  public id: number;
  private isEdit: boolean;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private specialtyService: SpecialtyService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      idSpecialty: new FormControl(0),
      nameSpecialty: new FormControl(''),
      descriptionSpecialty: new FormControl('')
    });
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if(this.isEdit) {
      this.specialtyService.findById(this.id).subscribe(data => {
        this.form = new FormGroup ({
          'idSpecialty' : new FormControl(data.idSpecialty),
          'nameSpecialty' : new FormControl(data.nameSpecialty, [Validators.required, Validators.minLength(5)]),
          'descriptionSpecialty' : new FormControl(data.descriptionSpecialty)
        });
      });
    }
  }

  operate() {
    const specialty = new Specialty();
    specialty.idSpecialty = this.form.value['idSpecialty'];
    specialty.nameSpecialty = this.form.value['nameSpecialty'];
    specialty.descriptionSpecialty = this.form.value['descriptionSpecialty'];

    if(this.isEdit) {
      // Update Patient
      this.specialtyService.update(specialty, this.id).subscribe(data => {
        this.specialtyService.findAll().subscribe(data => {
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('Specialty updated successfully');
        });
      });
    } else {
      // Insert patient
      // Practica Ideal
      this.specialtyService.save(specialty).pipe(switchMap(() => {
        return this.specialtyService.findAll();
      })).subscribe(data => {
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange('Specialty created successfully');
      });
    }
    this.router.navigate(['/pages/specialty']);
  }
}