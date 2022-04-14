import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewProjectComponent } from './new-project/new-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  faPlus = faPlus;


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  newProject(){
    this.dialog.open(NewProjectComponent)
  }


}
