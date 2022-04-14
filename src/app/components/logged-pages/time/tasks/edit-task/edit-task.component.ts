import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeTask } from 'src/app/_models/task';
import { TimeService } from 'src/app/_services/time.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  isLoading: boolean = false;

  editEntryForm: FormGroup;

  task: TimeTask

  timeModel: string;

  project: any = [];
  projects = [{ name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }, { name: 'Mustard' }, { name: 'Ketchup' }, { name: 'Relish' }];


  constructor(public dialog: MatDialog, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public timeTask: any, private timeService: TimeService) { }

  ngOnInit(): void {

    this.task = this.timeTask.task;

    this.timeModel = this.task.time;

    this.editEntryForm = this.fb.group({
      project: [this.task.project, Validators.required],
      time: [this.task.time, Validators.required],
      task: [this.task.task, Validators.required],
      notes: [this.task.notes],
      date: [this.task.date, Validators.required],
      idUser: [this.task.idUser, Validators.required],

    });

  }

  onChangeProject(){

    this.project = this.editEntryForm.value.projeto;

  }

  close() {
    this.dialog.closeAll();
  }

  checkTime(time: any) {

    this.timeModel = this.timeService.checkTime(time);;

    this.editEntryForm.patchValue({
      time: this.timeModel
    })

  }

  editTask(){

    this.isLoading = true;

    console.log(this.editEntryForm.value)
  }

}
