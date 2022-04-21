import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  newProjectForm: FormGroup;

  isActive: boolean = true;

  isLoading: boolean = false;

  user: User;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private projectService: ProjectService,
    private accountService: AccountService, private router: Router) {

      this.accountService.user.subscribe(x => this.user = x);

    }

  ngOnInit(): void {

    this.newProjectForm = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      budget: ['', Validators.required],
      endDate: ['', Validators.required],
      isActive: [this.isActive, Validators.required],
      idGroup: [this.user.idGroup, Validators.required],
    });
  }

    close() {
    this.dialog.closeAll();
  }

  submit(){
    this.isLoading = true;

    this.projectService.newProject(this.newProjectForm.value, this.accountService.getToken()).subscribe(_res =>{

      this.isLoading = false;

      this.projectService.setIsReload(true);

      this.close();

    }, _err =>{
      this.isLoading = false;
    })


  }

  changeStatus(){
    this.isActive = !this.isActive;

    this.newProjectForm.patchValue({isActive: this.isActive});

  }

}
