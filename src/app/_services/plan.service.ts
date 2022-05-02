import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from '../_models/plan';
@Injectable({ providedIn: 'root' })
export class PlanService {
  private planSubject: BehaviorSubject<Plan>;
  public plan: Observable<Plan>;

  private isReloadPlan = new BehaviorSubject<boolean>(false);

  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.planSubject = new BehaviorSubject<Plan>(JSON.parse(localStorage.getItem('plan')));
    this.plan = this.planSubject.asObservable();
  }

  public get rolesValue(): Plan {
    return this.planSubject.value;
  }

  public setPlan(plan: Plan) {

    this.planSubject.next(plan);

  }

  public setIsReload(status: boolean): void {
    this.isReloadPlan.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadPlan.asObservable();

  }

  getPlan(idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }


    const url = `${this.baseUrl}/account/api/auth/plan/getPlan/${idUser}`

    return this.http.get<Plan>(url, header);
  }

  newPlan(body: any, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/account/api/auth/plan/newPlan`

    return this.http.post<[any]>(url, body, header);
  }

  changePlan(body: any, idPlan: number, token: string,) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/account/api/auth/plan/changePlan/${idPlan}`

    return this.http.post<Plan>(url, body, header);
  }

}
