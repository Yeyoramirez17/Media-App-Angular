import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/model/exam';
import { ExamService } from 'src/app/service/exam.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit{
  public id: number;
  private isEdit: boolean;
  public form : FormGroup;

  constructor(
    private route : ActivatedRoute,
    private examService : ExamService,
    private router : Router) 
    { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      idExam : new FormControl(0),
      nameExam : new FormControl(''),
      descriptionExam : new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }
  
  initForm() {
    if(this.isEdit) {
      this.examService.findById(this.id).subscribe(data => {
        this.form = new FormGroup ({
          'idExam' : new FormControl(data.idExam),
          'nameExam' : new FormControl(data.nameExam, [Validators.required, Validators.minLength(3)]),
          'descriptionExam' : new FormControl(data.descriptionExam, [Validators.required, Validators.minLength(3)])
        });
      });
    }
  }
  operate() {
    const exam = new Exam();
    exam.idExam = this.form.value['idExam'];
    exam.nameExam = this.form.value['nameExam'];
    exam.descriptionExam = this.form.value['descriptionExam'];

    if(this.isEdit) {
      // Update Patient
      this.examService.update(exam, this.id).subscribe(data => {
        this.examService.findAll().subscribe(data => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('Exam updated successfully');
        });
      });
    } else {
      // Insert patient
      // Practica Ideal
      this.examService.save(exam).pipe(switchMap(() => {
        return this.examService.findAll();
      })).subscribe(data => {
        this.examService.setExamChange(data);
        this.examService.setMessageChange('Exam created successfully');
      });
    }
    this.router.navigate(['/pages/exam']);
  }
}
