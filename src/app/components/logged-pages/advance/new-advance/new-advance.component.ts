import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-new-advance',
  templateUrl: './new-advance.component.html',
  styleUrls: ['./new-advance.component.scss']
})
export class NewAdvanceComponent implements OnInit {

  newAdvanceForm: FormGroup;

  isLoading: boolean = false;

  projeto: string;

  user: User;

  project: any = [];
  //projects = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];
  projects: Project[] = [];


  constructor(public dialog: MatDialog, private fb: FormBuilder,
    private accountService: AccountService, private projectService: ProjectService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.newAdvanceForm = this.fb.group({
      project: ['', Validators.required],
      name: [this.user.name, Validators.required],
      idUser: [this.user.idUser, Validators.required],
      value: ['', Validators.required],
    });

    this.loadProjects();

  }

  close() {
    this.dialog.closeAll();
  }

  onChangeProject(){

    this.project = this.newAdvanceForm.value.projeto;

  }

  loadProjects() {
    this.isLoading = true;

    this.projectService.getProjects(this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      this.isLoading = false;
      this.projects = res;
    }, _err => {
      this.isLoading = false;
    })

  }
}
