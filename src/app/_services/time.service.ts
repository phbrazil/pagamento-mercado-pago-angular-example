﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { User } from '../_models/user';
import { MatDialog } from '@angular/material/dialog';
import { TimeTask } from '../_models/task';
@Injectable({ providedIn: 'root' })
export class TimeService {

  private currentDay = new BehaviorSubject<Date>(null);

  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {

}

public setCurrentDay(day: Date): void {
  this.currentDay.next(day);
}

public getCurrentDay(): Observable<Date> {
  return this.currentDay.asObservable();

}

  getEntries(idUser: number, date: string, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/time/getEntries/${idUser}/${date}`

    return this.http.get<[TimeTask]>(url, header);
  }



  newEntry(task: TimeTask, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/time/newEntry`;

    return this.http.post<any>(url,  task , header)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteEntry(idTask: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/time/deleteEntry/${idTask}`

    return this.http.delete<[any]>(url, header);
  }

  checkTime(time: any) {

    time = time.replace(/\D/g, "");
    if (time.length >= 3) {
      time = time.replace(/(.{2})$/, ":$1");
    } else if (time.length >= 2) {
      time = time.replace(/(.{2})$/, ":$1");
    } else if (time.length >= 1) {
      time = time.replace(/(.{2})$/, ":$1");
    }

    return time;

  }

}