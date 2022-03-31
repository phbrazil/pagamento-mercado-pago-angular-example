import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faArrowLeft, faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NewEntryComponent } from './new-entry/new-entry.component';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {


  entryForm = new FormGroup({
    date: new FormControl(''),
  });

  model: NgbDateStruct;
  date: { year: number, month: number };

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faClock = faClock;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private calendar: NgbCalendar) { }

  ngOnInit(): void {
  }

  newEntry() {

    this.dialog.open(NewEntryComponent);


  }

  selectToday() {
    this.model = this.calendar.getToday();
  }


}
