import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../components/shared/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  readonly baseUrl: string = Constants.baseUrl;


  constructor(private http: HttpClient) { }


  subscribe(email: string) {

    let body = {
      email : email
    }

    return this.http.post<boolean>(`${this.baseUrl}/account/api/auth/subscribe`, body);

  }


}
