import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TimeTask } from '../_models/time-task';
import { User } from '../_models/user';
import { Constants } from '../components/shared/utils/Constants';
@Injectable({ providedIn: 'root' })
export class TeamService {


  readonly baseUrl: string = Constants.baseUrl;


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


  getTeamMembers(idUser: number, idGroup: number, token: string) {


    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/team/getTeamMembers/${idUser}/${idGroup}`

    return this.http.get<[User]>(url, header);
  }

  disableUser(idUserRequester: number, idUser: number, token: string) {


    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/team/disableUser/${idUserRequester}/${idUser}`

    return this.http.delete<any>(url, header);
  }

  enableUser(idUserRequester: number, idUser: number, token: string) {


    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/team/enableUser/${idUserRequester}/${idUser}`

    return this.http.post<any>(url, header);
  }



}
