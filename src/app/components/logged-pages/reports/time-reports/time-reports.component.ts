import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TimeTask } from 'src/app/_models/time-task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimeService } from 'src/app/_services/time.service';
import { ChartType, LegendItem } from '../../lbd/lbd-chart/lbd-chart.component';

@Component({
  selector: 'app-time-reports',
  templateUrl: './time-reports.component.html',
  styleUrls: ['./time-reports.component.scss']
})
export class TimeReportsComponent implements OnInit {

  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  public tasksChartType: ChartType;
  public tasksChartData: any;
  public tasksChartLegendItems: LegendItem[];


  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];

  hoveredDate: NgbDate | null = null;

  user: User;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  isOpenCalendar: boolean = false;

  tasks: TimeTask[] = [];

  isLoading: boolean = false;


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if(this.toDate!= null){

      this.isOpenCalendar = false;

      this.loadTasks();
      console.log((this.toDate))

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
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    };
    this.emailChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
      { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
    ];



  this.tasksChartType = ChartType.Pie;
    this.tasksChartData = {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    };
    this.tasksChartLegendItems = [
      { title: 'Bug', imageClass: 'fa fa-circle text-info' },
      { title: 'Melhoria', imageClass: 'fa fa-circle text-danger' },
      { title: 'Suporte', imageClass: 'fa fa-circle text-warning' }
    ];


  this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value: any) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
        { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      ];

    }

    openCalendar(){
      this.isOpenCalendar = true;
    }

    loadTasks(){

      this.isLoading = true;

      let startDate = this.fromDate.day + '-'+ this.fromDate.month+'-'+this.fromDate.year;
      let endDate = this.toDate.day + '-'+ this.toDate.month+'-'+this.toDate.year;


      this.timeService.getEntriesByDate(this.user.idUser, startDate, endDate, this.accountService.getToken()).subscribe(res=>{

        this.isLoading = false;

        this.tasks = res;

      }, _err =>{

        this.isLoading = false;

      })
    }


}
