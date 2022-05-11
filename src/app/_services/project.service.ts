import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../components/shared/utils/Constants';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private isReloadProject = new BehaviorSubject<boolean>(false);


  readonly baseUrl: string = Constants.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public setIsReload(status: boolean): void {
    this.isReloadProject.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadProject.asObservable();

  }

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
