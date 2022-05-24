import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscribeService } from 'src/app/_services/subscribe.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FooterComponent implements OnInit {

  isLoading: boolean = false;

  subscribeForm: FormGroup;

  subscribed: boolean = false;

  constructor(private fb: FormBuilder, private subscribeService: SubscribeService) { }

  ngOnInit(): void {

    this.subscribeForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  submit(){

    this.isLoading = true;

    this.subscribeService.subscribe(this.subscribeForm.value.email).subscribe(res=>{

      if(res){
        this.subscribed = true;
        this.subscribeForm.reset();
      }
      this.isLoading = false;

    }, _err =>{
      this.isLoading = false;
    })

  }

}
