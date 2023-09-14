import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  title_label:string="";
  sub_title_label:string="";
  button_label_1:string="";
  button_label_2:string="";
  signaler:boolean;
  valider:boolean;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
  ) { }

  ngOnInit(): void {
    this.title_label = this.data.title_label;
    this.sub_title_label = this.data.sub_title_label;
    this.button_label_1  = this.data.button_label_1;
    this.button_label_2  = this.data.button_label_2;
    this.valider = this.data.valider;
    this.signaler  = this.data.signaler;

  }

  Validation_Form = new FormGroup({
    action: new FormControl("Paye", [ Validators.required, Validators.minLength(3) ]),
  });

  Signaler_Form = new FormGroup({
    action: new FormControl("Non Paye", [ Validators.required, Validators.minLength(3) ]),
  });

  public onSubmitConfirmation(){
    console.log('Appel Api confirm...',this.Validation_Form['value'])
    this.dialogRef.close(this.Validation_Form['value']);
  }
  public onSubmitSignaler(){
    console.log('Appel Api signal...',this.Validation_Form['value'])
    this.dialogRef.close(this.Signaler_Form['value']);
  }
  closeDialog(){this.dialogRef.close();}
}
