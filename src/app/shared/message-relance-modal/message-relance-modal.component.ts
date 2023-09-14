import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-relance-modal',
  templateUrl: './message-relance-modal.component.html',
  styleUrls: ['./message-relance-modal.component.css']
})
export class MessageRelanceModalComponent implements OnInit {
splitedTelephone:string[]=[];
selectedFolders:string[]=[];
title_label:string="";
sub_title_label_1:string="";
sub_title_label_2:string="";
button_label_1:string="";
button_label_2:string="";
multi_message:boolean;
Reclamation:boolean;
sms:boolean;
appel:boolean;
telephone:string;
NumPhone:string;
constructor(
public dialogRef: MatDialogRef<MessageRelanceModalComponent>,
public Message_RelanceModal: MatDialogRef<MessageRelanceModalComponent>,
@Inject(MAT_DIALOG_DATA) public data: any,
) { }

Reclamation_Form = new FormGroup({
textsms: new FormControl("", [ Validators.required])
});

sms_Form = new FormGroup({
  textsms: new FormControl("", [ Validators.required])
});

appel_Form = new FormGroup({
  commentaire: new FormControl("", [ Validators.required])
});

multiple_Form = new FormGroup({
  dossiers: new FormControl("", [ Validators.required]),
  textsms: new FormControl("", [ Validators.required])
});

ngOnInit(): void {
  this.title_label = this.data.title_label;
  this.sub_title_label_1 = this.data.sub_title_label_1;
  this.sub_title_label_2 = this.data.sub_title_label_2;
  this.button_label_1  = this.data.button_label_1;
  this.button_label_2  = this.data.button_label_2;
  this.Reclamation= this.data.Reclamation;
  this.selectedFolders=this.data.selectedFolders;
  this.multi_message=this.data.multi_message;
  this.sms= this.data.sms;
  this.appel= this.data.appel;
  this.telephone= this.data.telephone;
  this.splitedTelephone = this.telephone.split(',');
  console.log(this.splitedTelephone[0])
  this.NumPhone =this.splitedTelephone[0];
}

public onSubmitReclamation(){
  console.log('Reclamation Form ...',this.Reclamation_Form.value.textsms)
  this.dialogRef.close(this.Reclamation_Form.value.textsms);
}
public onSubmitSMS(){
  console.log('SMS Form ...',this.sms_Form['value'])
  this.dialogRef.close(this.sms_Form['value']);
}
public onSubmitAppel(){
  console.log('Appel Api ...',this.appel_Form['value'])
  this.dialogRef.close(this.appel_Form['value']);
}

public onSubmitMultiple(){
  this.multiple_Form.value.dossiers = this.selectedFolders;
  console.log('Appel Relance en masse Api ...',this.multiple_Form)
  this.dialogRef.close(this.multiple_Form['value']);
}
}
