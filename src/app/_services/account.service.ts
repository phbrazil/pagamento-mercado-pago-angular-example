import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { User } from '../_models/user';
import { MatDialog } from '@angular/material/dialog';
@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private emailNewPassword = new BehaviorSubject<string>(null);
  private isLogged = new BehaviorSubject<boolean>(false);
  private isReloadmember = new BehaviorSubject<boolean>(false);

  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'


  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public setUser(user: User) {

    this.userSubject.next(user);

  }


  public setIsLogged(status: boolean): void {
    this.isLogged.next(status);
  }

  public getIsLogged(): Observable<boolean> {
    return this.isLogged.asObservable();

  }

  public setIsReloadMembers(status: boolean): void {
    this.isReloadmember.next(status);
  }

  public getIsReloadMembers(): Observable<boolean> {
    return this.isReloadmember.asObservable();

  }

  //GET TOKEN
  public getToken() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    //expired token example
    //return 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXVsb2gyMDEyc3VsQGdtYWlsLmNvbSIsImlhdCI6MTYzNTI3Nzg2NywiZXhwIjoxNjM1MzY0MjY3fQ.nYGf8hDBrLbLYHElFQFiPjjAi0MqsNMP_vZZWQ4SW-nc2HRW05UUtOZU7Sv2EPo30t6O4DpUmWpNdz--84KIuQ'
    return user.token;
  }


  //email para troca de senha
  public setEmailNewPassword(email: string) {
    this.emailNewPassword.next(email);
  }

  public getEmailNewPassword(): Observable<string> {
    return this.emailNewPassword.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

  cep(cep: string) {

    cep = cep.replace(/\D/g, '');

    if (cep !== '') {

      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {

        let url = `${this.baseUrl}/sparta/getCep/${cep}`;

        return this.http.get<any>(url)
          .pipe(map(dados => {

            switch (dados.dados.uf) {
              case 'RO':
                dados.dados.estado = 'Rondônia'
                break;
              case 'AC':
                dados.dados.estado = 'Acre'
                break;
              case 'AM':
                dados.dados.estado = 'Amazonas'
                break;
              case 'RR':
                dados.dados.estado = 'Roraima'
                break;
              case 'PA':
                dados.dados.estado = 'Pará'
                break;
              case 'AP':
                dados.dados.estado = 'Amapá'
                break;
              case 'TO':
                dados.dados.estado = 'Tocantins'
                break;
              case 'MA':
                dados.dados.estado = 'Maranhão'
                break;
              case 'PI':
                dados.dados.estado = 'Piauí'
                break;
              case 'CE':
                dados.dados.estado = 'Ceará'
                break;
              case 'RN':
                dados.dados.estado = 'Rio Grande do Norte'
                break;
              case 'PB':
                dados.dados.estado = 'Paraíba'
                break;
              case 'PE':
                dados.dados.estado = 'Pernambuco'
                break;
              case 'AL':
                dados.dados.estado = 'Alagoas'
                break;
              case 'SE':
                dados.dados.estado = 'Sergipe'
                break;
              case 'BA':
                dados.dados.estado = 'Bahia'
                break;
              case 'MG':
                dados.dados.estado = 'Minas Gerais'
                break;
              case 'ES':
                dados.dados.estado = 'Espírito Santo'
                break;
              case 'RJ':
                dados.dados.estado = 'Rio de Janeiro'
                break;
              case 'SP':
                dados.dados.estado = 'São Paulo'
                break;
              case 'PR':
                dados.dados.estado = 'Paraná'
                break;
              case 'RS':
                dados.dados.estado = 'Rio Grande do Sul'
                break;
              case 'MS':
                dados.dados.estado = 'Mato Grosso do Sul'
                break;
              case 'MT':
                dados.dados.estado = 'Mato Grosso'
                break;
              case 'GO':
                dados.dados.estado = 'Goiás'
                break;
              case 'DF':
                dados.dados.estado = 'Distrito Federal'
                break;
            }
            return dados;
          }));
      } else {
        this.alertService.error('Cep inválido', 'tente novamente', { keepAfterRouteChange: true });

      }
    }
  }



  login(email: string, password: string) {

    const url = `${this.baseUrl}/account/api/auth/signin`;

    return this.http.post<User>(url, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user)
        return user;
      }));
  }



  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }



  getTokenStatus() {

    const token = this.getToken();

    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get<any>(`${this.baseUrl}/account/api/auth/refreshToken`, { headers });


  }

  register(body: any) {


    return this.http.post<any>(`${this.baseUrl}/opportunity/createAccount`, body);

  }


  createMemberAccount(body: User, token: string, idUser: number) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    return this.http.post<User>(`${this.baseUrl}/opportunity/createAccountMember/${idUser}`, body, header);

  }

  completeRegister(body: any) {

    const token = this.getToken();

    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.put<any>(`${this.baseUrl}/spartaclan/completeAccount`, body, { headers });

  }

  confirmEmail(validationCode: string) {

    return this.http.post<any>(`${this.baseUrl}/spartaclan/confirmEmail/${validationCode}`, {});

  }


  getAllUsers() {

    const token = this.getToken();

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/userDelete/getAllUsers`

    return this.http.get<[User]>(url, header);
  }


  getUserById(idUser: number) {

    const token = this.getToken();

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/opportunity/getUser/${idUser}`


    return this.http.get<User>(url, header);
  }

  getPendingPassword(validationCode: string) {

    const token = this.getToken();

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/opportunity/getPendingPassword/${validationCode}`


    return this.http.get<User>(url, header);
  }

  editUser(body: any) {

    const token = this.getToken();

    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.put<any>(`${this.baseUrl}/spartaclan/editAccount`, body, { headers });

  }

  resetPassword(email: string) {

    return this.http.post<boolean>(`${this.baseUrl}/opportunity/resetPassword/${email}` ,{});

  }

  confirmNewPassword(email: string, password: string) {

    const url = `${this.baseUrl}/account/api/auth/confirmNewPassword`;

    return this.http.post<User>(url, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        this.userSubject.next(user);
        return user;
      }));
  }

  createNewPassword(data: any) {

    const url = `${this.baseUrl}/opportunity/createNewPassword`;

    return this.http.put<User>(url, data)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  logout() {

    this.dialog.closeAll();

    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.setUser(null);

  }

}
