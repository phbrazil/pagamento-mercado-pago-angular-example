import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TimeTask } from '../_models/time-task';
@Injectable({ providedIn: 'root' })
export class TimeService {

  private currentDay = new BehaviorSubject<Date>(null);
  private isReloadTimeTasks = new BehaviorSubject<boolean>(false);


  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {

}

public setIsReload(status: boolean): void {
  this.isReloadTimeTasks.next(status);
}

public getIsReload(): Observable<boolean> {
  return this.isReloadTimeTasks.asObservable();

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

  getEntriesByDate(idUser: number, startDate: string, endDate: string, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/time/getEntriesByDate/${idUser}/${startDate}/${endDate}`

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
    if (time.length >= 3 || time.length >= 2 || time.length >= 1) {
      time = time.replace(/(.{2})$/, ":$1");
    }
    return time;
  }

  calcTime(time: number) {


    if (!Number.isInteger(time)) {

      var hour = Number(String(time).split(".")[0]);
      var minute = Number(String(time).split(".")[1]);

      do {

        if (minute >= 60) {
          hour = hour + 1;
          minute = minute - 60;
        }

      } while (minute >= 60);


      return Number(hour + '.' + minute);

    }

    return time;

  }

  finishCalcTime(total: number) {

    let totalFormatted;

    if (!Number.isInteger(total)) {

      let hour = Number(String(total).split(".")[0]);
      let minute = Number(String(total).split(".")[1]);

      do {

        if (minute >= 60) {
          hour = hour + 1;
          minute = minute - 60;
        }

      } while (minute >= 60);


      totalFormatted = (hour + ':' + minute);

    } else {

      totalFormatted = (String(total).replace('.', ':') + ':00');

    }

    return totalFormatted;


  }

  convertDDMMYYYToYYYYMMDD(data: string) {
    var dia  = data.split("-")[0];
    var mes  = data.split("-")[1];
    var ano  = data.split("-")[2];

    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  }


}
