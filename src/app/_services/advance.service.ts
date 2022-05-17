import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Advance } from '../_models/advance';
import { Constants } from '../components/shared/utils/Constants';
import { ReceiptAdvance } from '../_models/receiptAdvance';
@Injectable({ providedIn: 'root' })
export class AdvanceService {
  private advanceSubject: BehaviorSubject<Advance>;
  public advance: Observable<Advance>;

  private isReloadAdvance = new BehaviorSubject<boolean>(false);

  readonly baseUrl: string = Constants.baseUrl;


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

  newAdvance(body: any, idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/advance/newAdvance/${idUser}`

    return this.http.post<Advance>(url, body, header);
  }

  newReceiptAd(body: any, idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/advance/newReceiptAd/${idUser}`

    return this.http.post<ReceiptAdvance>(url, body, header);
  }

  getReceiptAd(idReceiptAd: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/advance/getReceiptAd/${idReceiptAd}`

    return this.http.get<ReceiptAdvance>(url, header);
  }

  getAllReceiptAd(idAdvance: number, idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/advance/getAllReceiptAd/${idAdvance}/${idUser}`

    return this.http.get<[ReceiptAdvance]>(url, header);
  }

  getStatus(status: string): string {
    switch (status) {
      case 'cr': {
        return "Criado"
      }
      case 'ap': {
        return "Aprovado"
      }
      case 're': {
        return "Rejeitado"
      }
      case 'ca': {
        return "Cancelado"
      }


    }

    return "";

  }

}
