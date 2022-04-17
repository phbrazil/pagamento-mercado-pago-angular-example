import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptLocale from '@fullcalendar/core/locales/pt';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-time',
  templateUrl: './my-time.component.html',
  styleUrls: ['./my-time.component.scss']
})
export class MyTimeComponent implements OnInit {

  calendarPlugins = [dayGridPlugin]

  isWeekend: boolean = true;

  calendarOptions: CalendarOptions = {
    locale: ptLocale,
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    weekends: this.isWeekend, // initial value
    events: [
      { title: '3 hrs', date: '2022-04-05' },
      { title: '7 hrs', date: '2022-04-07' }
    ]
  };

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleDateClick(arg: any) {
    console.log('date click! ' + arg.dateStr)
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
