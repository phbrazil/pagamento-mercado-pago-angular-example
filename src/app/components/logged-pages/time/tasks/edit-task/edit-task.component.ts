import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  isLoading: boolean = false;

  editEntryForm: FormGroup;

  project: any = [];
  projects = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];

  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.editEntryForm = this.fb.group({
      projeto: ['', Validators.required],
      time: ['', Validators.required],
      task: ['', Validators.required],
    });

  }

  onChangeProject(){

    this.project = this.editEntryForm.value.projeto;

    console.log(this.editEntryForm.value.projeto)

  }

  close() {
    this.dialog.closeAll();
  }

}
