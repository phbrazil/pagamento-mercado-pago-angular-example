import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/_models/roles';
import { RolesService } from 'src/app/_services/roles.service copy';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  roles: Roles;
  constructor(private rolesService: RolesService) {


  }

  ngOnInit(): void {
  }

}
