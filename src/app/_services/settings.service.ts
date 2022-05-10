import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from '../_models/settings';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class SettingsService {

  private defaultColor = new BehaviorSubject<string>('nav-green');
  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {

}

public setColor(color: string): void {
  this.defaultColor.next(color);
}

public getColor(): Observable<string> {
  return this.defaultColor.asObservable();

}

  getSettings(idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/settings/getSettings/${idUser}`

    return this.http.get<Settings>(url, header);
  }

  newSettings(settings: Settings, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/settings/newSettings`;

    return this.http.post<Settings>(url,  settings , header)
      .pipe(map(res => {
        return res;
      }));
  }
}
