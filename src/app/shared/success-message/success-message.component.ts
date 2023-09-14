import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  public title_label:string="";
  public sub_title_label:string="";
  public button_label:string="";
  public echec_icon:boolean;
  public success_icon:boolean;
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.title_label = this.data.title_label;
    this.sub_title_label = this.data.sub_title_label;
    this.button_label = this.data.button_label;
    this.success_icon = this.data.success_icon;
    this.echec_icon = this.data.echec_icon;
  }


}
