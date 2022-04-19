import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  newProjectForm: FormGroup;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private projectService: ProjectService,
    private accountService: AccountService) { }

  ngOnInit(): void {

    this.newProjectForm = this.fb.group({
      name: ['', Validators.required],
      budget: ['', Validators.required],
      endDate: ['', Validators.required],
      isActive: ['', Validators.required],
    });
  }

    close() {
    this.dialog.closeAll();
  }

  submit(){
    this.isLoading = true;



    this.projectService.newProject(this.newProjectForm.value, this.accountService.getToken()).subscribe(res =>{
      console.log(res)
      this.isLoading = false;

    }, err =>{
      this.isLoading = false;
    })


  }

}
