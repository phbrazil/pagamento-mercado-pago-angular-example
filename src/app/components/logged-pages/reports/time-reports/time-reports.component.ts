import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TimeTask } from 'src/app/_models/time-task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimeService } from 'src/app/_services/time.service';
import { ChartType, LegendItem } from '../../lbd/lbd-chart/lbd-chart.component';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-time-reports',
  templateUrl: './time-reports.component.html',
  styleUrls: ['./time-reports.component.scss']
})
export class TimeReportsComponent implements OnInit {



  hoveredDate: NgbDate | null = null;

  user: User;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  isOpenCalendar: boolean = false;

  tasks: TimeTask[] = [];

  isLoading: boolean = false;



  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.toDate != null) {

      this.isOpenCalendar = false;

      this.loadTasks();

    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {

    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);

  }

  constructor(calendar: NgbCalendar, private accountService: AccountService, private timeService: TimeService) {
    this.fromDate = calendar.getPrev(calendar.getToday(), 'd', 10);
    this.toDate = calendar.getToday();
    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.loadTasks();

  }

  openCalendar() {
    this.isOpenCalendar = true;
  }

  loadTasks() {

    this.isLoading = true;

    let startDate = this.fromDate.day + '-' + this.fromDate.month + '-' + this.fromDate.year;
    let endDate = this.toDate.day + '-' + this.toDate.month + '-' + this.toDate.year;

    this.timeService.getEntriesByDate(this.user.idUser, startDate, endDate, this.accountService.getToken()).subscribe(res => {

      this.isLoading = false;

      this.tasks = res;

    }, _err => {

      this.isLoading = false;

    })
  }

  generateImage() {

    var node: any = document.getElementById('image-section');

    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

}
