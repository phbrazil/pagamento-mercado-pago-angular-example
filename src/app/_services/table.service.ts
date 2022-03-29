import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private tableUrl: string = "http://localhost:3000/partidas";

  constructor(private httpclient: HttpClient) { }

  getTable(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.tableUrl}`);
  }
}
