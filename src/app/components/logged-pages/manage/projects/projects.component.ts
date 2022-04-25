import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { NewProjectComponent } from './new-project/new-project.component';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { TableSortService } from 'src/app/components/shared/table-sort.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  faPlus = faPlus;
  faActive = faThumbsUp;
  faInactive = faThumbsDown;
  user: User;
  isLoading: boolean = false;

  projects: Project[] = [];

  //DATATABLE
  dtOptions: DataTables.Settings = {};

  constructor(private dialog: MatDialog, private projectService: ProjectService, private accountService: AccountService, private dataTableSettings: TableSortService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.dtOptions = this.dataTableSettings.getSettings();

    this.projectService.getIsReload().subscribe(status => {
      if (status != null && status) {
        this.loadProjects();
      }
    })

    this.loadProjects();

  }


  newProject() {
    this.dialog.open(NewProjectComponent)
  }

  loadProjects() {

    this.projectService.setIsReload(false);

    this.isLoading = true;

    this.projectService.getProjects(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.projects = res;
      this.isLoading = false;
    }, _err => {
      this.isLoading = false;
    })

  }

}
