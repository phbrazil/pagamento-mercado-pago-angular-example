import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { NewProjectComponent } from './new-project/new-project.component';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  faPlus = faPlus;
  user: User;
  isLoading: boolean = false;

  projects: Project[] = [];

  constructor(private dialog: MatDialog, private projectService: ProjectService, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.projectService.getIsReload().subscribe(status=>{
      if(status){
        this.loadProjects();
      }
    })

    this.loadProjects();

  }


  newProject() {
    this.dialog.open(NewProjectComponent)
  }

  loadProjects() {

    this.isLoading = true;

    this.projectService.getProjects(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.projects = res;
      console.log(res);
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    })

  }

}
