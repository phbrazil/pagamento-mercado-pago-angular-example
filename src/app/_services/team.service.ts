import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TimeTask } from '../_models/time-task';
@Injectable({ providedIn: 'root' })
export class TeamService {


  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {

}

  getTeamReport(idUser: number, idGroup: number, startDate: string, endDate: string, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/team/getTeamReport/${idUser}/${idGroup}/${startDate}/${endDate}`

    return this.http.get<[any]>(url, header);
  }

}
