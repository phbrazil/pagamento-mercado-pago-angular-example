import { Injectable } from '@angular/core';
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

  private tasksSubject: BehaviorSubject<TimeTask[]>;
  public tasks: Observable<TimeTask[]>;

  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {

}

public get tasksList(): TimeTask[] {
  return this.tasksSubject.value;
}

public setTasks(tasks: TimeTask[]) {

  this.tasksSubject.next(tasks);

}


  getEntries(idUser: number, date: string, token: string) {

    console.log(idUser)
    console.log(date)

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/time/getEntries/${idUser}/${date}`

    return this.http.get<[TimeTask]>(url, header);
  }



  newEntry(task: TimeTask, token: string) {

    console.log(task)

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

}
