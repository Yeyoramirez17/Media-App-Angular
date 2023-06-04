import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Medic } from './../model/medic';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic>{

  // Variable Reactiva
  private patientChange = new Subject<Medic[]>();
  private messageChange = new Subject<string>();

  constructor(protected override http : HttpClient) { 
    super(http, `${environment.HOST}/medics`);
  }

  setMedicChange(data : Medic[]) {
    this.patientChange.next(data);
  }
  getMedicChange() {
    return this.patientChange.asObservable();
  }
  setMessageChange(data : string) {
    this.messageChange.next(data);
  }
  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
