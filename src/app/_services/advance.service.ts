import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from '../_models/plan';
import { Advance } from '../_models/advance';
@Injectable({ providedIn: 'root' })
export class AdvanceService {
  private advanceSubject: BehaviorSubject<Advance>;
  public advance: Observable<Advance>;

  private isReloadAdvance = new BehaviorSubject<boolean>(false);

  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.advanceSubject = new BehaviorSubject<Advance>(JSON.parse(localStorage.getItem('plan')));
    this.advance = this.advanceSubject.asObservable();
  }

  public get rolesValue(): Advance {
    return this.advanceSubject.value;
  }

  public setAdvance(advance: Advance) {

    this.advanceSubject.next(advance);

  }

  public setIsReload(status: boolean): void {
    this.isReloadAdvance.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadAdvance.asObservable();

  }

  getAdvance(idAdvance: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/advance/getAdvance/${idAdvance}`

    return this.http.get<Advance>(url, header);
  }

  getAllAdvances(idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/advance/getAllAdvances/${idUser}`

    return this.http.get<[Advance]>(url, header);
  }

  newAdvance(body: any, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/advance/newAdvance`

    return this.http.post<Advance>(url, body, header);
  }

  getStatus(status: string): string{
    switch(status){
      case '0':{
        return "Criado"
      }
      case '1':{
        return "Aprovado"
      }
      case '2':{
        return "Rejeitado"
      }


    }

    return "";

  }

}
