import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../_models/card';
@Injectable({ providedIn: 'root' })
export class CardService {
  private cardSubject: BehaviorSubject<Card>;
  public card: Observable<Card>;

  private isReloadCard = new BehaviorSubject<boolean>(false);

  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.cardSubject = new BehaviorSubject<Card>(JSON.parse(localStorage.getItem('card')));
    this.card = this.cardSubject.asObservable();
  }

  public get rolesValue(): Card {
    return this.cardSubject.value;
  }

  public setCard(card: Card) {

    this.cardSubject.next(card);

  }

  public setIsReload(status: boolean): void {
    this.isReloadCard.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadCard.asObservable();

  }

  getCard(idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }


    const url = `${this.baseUrl}/card/getCard/${idUser}`

    return this.http.get<Card>(url, header);
  }
}
