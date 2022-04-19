import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  readonly baseUrl: string = 'https://opportunity-back-end.herokuapp.com'
  //readonly baseUrl: string = 'http://localhost:8080'

  constructor(
    private http: HttpClient
  ) { }

  newProject(project: Project, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/project/newProject`;

    return this.http.post<any>(url,  project , header)
      .pipe(map(res => {
        return res;
      }));
  }

  getProjects(idGroup: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/project/getProjects/${idGroup}`

    return this.http.get<[Project]>(url, header);
  }
}
