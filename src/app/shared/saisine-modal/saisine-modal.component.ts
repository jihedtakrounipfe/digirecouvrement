import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileModalComponent } from '../upload-file-modal/upload-file-modal.component';

@Component({
  selector: 'app-saisine-modal',
  templateUrl: './saisine-modal.component.html',
  styleUrls: ['./saisine-modal.component.scss'],

})
export class SaisineModalComponent implements OnInit {
  public title_label:string="";
  public sub_title_label:string="";
  public button_label_1:string="";
  public button_label_2:string="";
  public phase:string;
  public saisine:boolean;
  public error: boolean;
  public erreur: string;
  public frais:Boolean;
  public minDate: Date;
  public FormData:FormData;
  constructor(
  public dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public SaisineModal: MatDialogRef<SaisineModalComponent>
  )
  {}
  ngOnInit(): void {
    this.title_label = this.data.title_label;
    this.sub_title_label = this.data.sub_title_label;
    this.button_label_1 = this.data.button_label_1;
    this.button_label_2 = this.data.button_label_2;
    this.saisine = this.data.saisine;
    this.phase = this.data.phase;
    console.log(this.saisine)
    console.log(this.phase)
  }

  Saisine_Form = new FormGroup({
    nomsaisine: new FormControl("", [Validators.required]),
    region: new FormControl("", [Validators.required]),
    typeDeTiers: new FormControl("", [Validators.required]),
    nomDeTiers: new FormControl("", [Validators.required]),
    formData: new FormControl("", [Validators.required]),
  });


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  colsePopup() {
    this.SaisineModal.close()
  }

  OnSubmitSaisine(){
        console.log(this.Saisine_Form.value.formData ,'form data')
        this.FormData.append('nomsaisine', this.Saisine_Form.value.nomsaisine)
        this.FormData.append('region', this.Saisine_Form.value.region)
        this.FormData.append('typeDeTiers', this.Saisine_Form.value.typeDeTiers)
        this.FormData.append('nomDeTiers', this.Saisine_Form.value.nomDeTiers)
        this.SaisineModal.close(this.FormData)
  }

  type = ['Ben Arous','Sousse','Gafsa']
  Autre = ['Avocat ','Huissier']

  public openModal() {
    const dialogRef =
    this.dialog.open(UploadFileModalComponent,
      {
      data: {name: "upload File"},
      width:'700px',
      height:'480px',
      disableClose: true
      });
    dialogRef.afterClosed().subscribe((Myfile) => {
      console.log(Myfile,'after close popup file')
      this.FormData = Myfile
  })
  }
}
