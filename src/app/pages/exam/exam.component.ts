import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { ExamService } from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nameExam', 'descriptionExam', 'actions'];
  dataSource : MatTableDataSource<Exam>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private examService: ExamService,
    private _snackBar: MatSnackBar) 
  {}

  ngOnInit(): void {
    // Recupera los datos de la variable reactiva
    // Se invoca solo cuando detecta un next
    this.examService.getExamChange().subscribe(data => {
      this.createTable(data);
    });

    this.examService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration:2000, verticalPosition:'top'});
    });

    this.examService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }

  createTable(data: Exam[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number) {
    this.examService.delete(id).pipe(switchMap( () => {
      return this.examService.findAll();
    }))
    .subscribe(data => {
      this.examService.setExamChange(data);
      this.examService.setMessageChange('Patient delected successfully');
    });
  }
}
