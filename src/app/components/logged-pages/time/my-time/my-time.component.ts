import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, CalendarApi, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptLocale from '@fullcalendar/core/locales/pt';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-my-time',
  templateUrl: './my-time.component.html',
  styleUrls: ['./my-time.component.scss']
})
export class MyTimeComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin];

  isWeekend: boolean = true;

  currentMonth: string;

  calendarOptions: CalendarOptions = {
    locale: ptLocale,
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    weekends: this.isWeekend, // initial value
    events: [
      { title: '3 hrs', date: '2022-04-05' },
      { title: '7 hrs', date: '2022-04-07' }
    ],
    customButtons: {
      next: {
        text: "Próximo",
        click: this.nextMonth.bind(this),
      },
      prev: {
        text: "Anterior",
        click: this.prevMonth.bind(this),
      },

      today: {
        text: "Hoje",
        click: this.today.bind(this),
      }
    },
  };

  constructor(private dialog: MatDialog) { }

  ngOnInit() {

  }

  handleDateClick(arg: any) {
    console.log('date click! ' + arg.dateStr)
  }

  nextMonth(): void {

    let calendarApi = this.calendarComponent.getApi();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    console.log(this.currentMonth);

    calendarApi.next();

  }

  prevMonth(): void {

    let calendarApi = this.calendarComponent.getApi();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    console.log(this.currentMonth);

    calendarApi.prev();
  }

  today(): void {

    let calendarApi = this.calendarComponent.getApi();

    var date = moment(calendarApi.getDate(), "DD/MM/YYYY");

    this.currentMonth = date.format("DD-MM-YYYY");

    console.log(this.currentMonth);

    calendarApi.today();
  }

  close() {

    console.log('cliquei')

    this.dialog.closeAll();

  }

  enableWeekend() {
    this.isWeekend = !this.isWeekend;

    this.calendarOptions = {
      locale: ptLocale,
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this), // bind is important!
      weekends: this.isWeekend, // initial value
      events: [
        { title: '3 hrs', date: '2022-04-05' },
        { title: '7 hrs', date: '2022-04-07' }
      ]
    } as CalendarOptions;
  }
}
