import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../_models/card';
@Injectable({ providedIn: 'root' })
export class CurrencyService {

  private isReloadCurrency = new BehaviorSubject<boolean>(false);

  readonly baseUrl: string = 'https://economia.awesomeapi.com.br/all/'


  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {

  }

  public setIsReload(status: boolean): void {
    this.isReloadCurrency.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadCurrency.asObservable();

  }

  getCurrency(currency: string) {

    const url = `${this.baseUrl}/${currency}-BRL`

    return this.http.get<any>(url);
  }
}
