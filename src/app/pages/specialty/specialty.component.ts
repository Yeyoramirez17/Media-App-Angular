import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Specialty } from 'src/app/model/specialty';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nameSpecialty', 'descriptionSpecialty', 'actions'];
  dataSource : MatTableDataSource<Specialty>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private specialtyService: SpecialtyService,
    private _snackBar: MatSnackBar,
    private route : ActivatedRoute)
  {}

  ngOnInit(): void {
    this.specialtyService.getSpecialtyChange().subscribe(data => {
      this.createTable(data);
    });

    this.specialtyService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration:2000, verticalPosition:'top'});
    });

    this.specialtyService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim();
  }

  createTable(data: Specialty[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number) {
    this.specialtyService.delete(id).pipe(switchMap( () => {
      return this.specialtyService.findAll();
    }))
    .subscribe(data => {
      this.specialtyService.setSpecialtyChange(data);
      this.specialtyService.setMessageChange('Specialty delected successfully');
    });
  }

  checkChildren() : boolean {
    return this.route.children.length != 0;
  }

}
