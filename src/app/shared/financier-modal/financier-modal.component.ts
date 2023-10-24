import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileModalComponent } from '../upload-file-modal/upload-file-modal.component';

@Component({
  selector: 'app-financier-modal',
  templateUrl: './financier-modal.component.html',
  styleUrls: ['./financier-modal.component.scss'],

})
export class FinancierModalComponent implements OnInit {
  public title_label:string="";
  public sub_title_label:string="";
  public button_label_1:string="";
  public button_label_2:string="";
  public phase:string;
  public versement:boolean;
  public error: boolean;
  public erreur: string;
  public frais:Boolean;
  public minDate: Date;
  public FormData:FormData;
  public formattedDate: string = new Date().toISOString();
  constructor(
  public dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public FinancierModal: MatDialogRef<FinancierModalComponent>,
  )
  {
    const currentYear = new Date().getFullYear();
    const currentmonth = new Date().getMonth();
    const currentDay = new Date().getDay();

    console.log('date',currentYear, currentmonth, currentDay)
    this.minDate = new Date(currentYear, currentmonth-1, currentDay);
    console.log('mindate',this.minDate)

  }

  ngOnInit(): void {
    this.title_label = this.data.title_label;
    this.sub_title_label = this.data.sub_title_label;
    this.button_label_1 = this.data.button_label_1;
    this.button_label_2 = this.data.button_label_2;
    this.versement = this.data.versement;
    this.frais = this.data.frais;
    this.phase = this.data.phase;
    console.log(this.frais)
    console.log(this.versement)
    console.log(this.phase)
  }
  frais_Form = new FormGroup({
    naturefrais: new FormControl("", [Validators.required]),
    typefrais: new FormControl("", [Validators.required]),
    tiers: new FormControl("", [Validators.required]),
    referencePvFacture: new FormControl("", [Validators.required]),
    montants: new FormControl("", [Validators.required]),
    HT: new FormControl("", [Validators.required]),
    TVA: new FormControl("", [Validators.required]),
    debours: new FormControl("", [Validators.required]),
    datedeffdesir: new FormControl(this.formattedDate, [Validators.required]),
  });

  Versement_Form = new FormGroup({
    referenceVersement: new FormControl("", [ Validators.required,Validators.pattern('[A-Z]+[0-9]+') ]),
    dateVersement: new FormControl("", [ Validators.required ]),
    montantVersement: new FormControl("", [ Validators.required ]),
    modeReglement: new FormControl("", [ Validators.required]),
    typeVersement: new FormControl("", [ Validators.required]),
    affectaion: new FormControl("", [ Validators.required]),
    formData: new FormControl("", [ Validators.required ]),
  });


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  colsePopup() {
    this.FinancierModal.close()
  }

  OnSubmitVersement(){
    if(this.Versement_Form.controls['referenceVersement'].invalid && (this.Versement_Form.controls['referenceVersement'].dirty || this.Versement_Form.controls['referenceVersement'].touched)){
      this.error = true ;
      this.erreur = "Veuillez saisir des données correcte";
      console.log("erreur", this.erreur)
    }else{
        console.log(this.Versement_Form.value.formData ,'form data')
        this.FormData.append('referenceVersement', this.Versement_Form.value.referenceVersement)
        this.FormData.append('dateVersement', this.Versement_Form.value.dateVersement)
        this.FormData.append('montantVersement', this.Versement_Form.value.montantVersement)
        this.FormData.append('modeReglement', this.Versement_Form.value.modeReglement)
        this.FormData.append('typeVersement', this.Versement_Form.value.typeVersement)
        this.FormData.append('affectaion', this.Versement_Form.value.affectaion)
        this.FinancierModal.close(this.FormData)
    }
  }

  OnSubmitFrais(){
    this.FinancierModal.close(this.frais_Form.value)
  }

  type = ['Au comptant','Périodique','Libre']
  mode=['Espèces ','Virement','chèque']
  affectation=['Créance 1']
  nature=['Téléphone','Message','Web télégramme']
  typeFrais=['Type 1','Type 2']
  tiers=['Agent de télécommunication','Huissier notaire']


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
