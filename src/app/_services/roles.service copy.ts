import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from '../_models/roles';
@Injectable({ providedIn: 'root' })
export class RolesService {
  private rolesSubject: BehaviorSubject<Roles>;
  public roles: Observable<Roles>;

  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.rolesSubject = new BehaviorSubject<Roles>(JSON.parse(localStorage.getItem('roles')));
    this.roles = this.rolesSubject.asObservable();
  }

  public get rolesValue(): Roles {
    return this.rolesSubject.value;
  }

  public setRoles(roles: Roles) {

    this.rolesSubject.next(roles);

  }

  getRoles(idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/account/api/auth/roles/getRoles/${idUser}`

    return this.http.get<Roles>(url, header);
  }

  newRoles(body: any, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/account/api/auth/roles/newRoles`

    return this.http.post<[any]>(url, body, header);
  }

}
