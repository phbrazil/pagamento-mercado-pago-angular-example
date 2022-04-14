import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  newProjectForm: FormGroup;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.newProjectForm = this.fb.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

    close() {
    this.dialog.closeAll();
  }

}
