import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from '../_models/settings';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../components/shared/utils/Constants';
@Injectable({ providedIn: 'root' })
export class SettingsService {

  private isReloadSettings = new BehaviorSubject<boolean>(false);

  private defaultColor = new BehaviorSubject<string>('nav-green');
  readonly baseUrl: string = Constants.baseUrl;


  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {

  }

  public setIsReload(status: boolean): void {
    this.isReloadSettings.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadSettings.asObservable();

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

    return this.http.post<any>(url, settings, header)
      .pipe(map(res => {
        return res;
      }));
  }

  editSettings(settings: Settings, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/settings/editSettings`;

    return this.http.put<any>(url, settings, header)
      .pipe(map(res => {
        return res;
      }));
  }
}
