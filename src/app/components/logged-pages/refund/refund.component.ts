import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/_models/plan';
import { PlanService } from 'src/app/_services/plan.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  plan: Plan;
  constructor(private planService: PlanService) {


  }

  ngOnInit(): void {
  }

}
