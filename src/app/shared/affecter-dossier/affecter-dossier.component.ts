import { ListDossiersComponent } from './../../modules/list-dossiers/list-dossiers.component';
import { ListChargeService } from 'app/services/list-charges.service';
import { SuccessMessageComponent } from './../success-message/success-message.component';
import { Component , Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-affecter-dossier',
  templateUrl: './affecter-dossier.component.html',
  styleUrls: ['./affecter-dossier.component.css']
})
export class AffecterDossierComponent implements OnInit {
  title_label:string;
  sub_title_label:string;
  sub_title_label_1:string;
  button_label_1:string;
  button_label_2:string;
  selectedFolder:string;
  affecter_Display:boolean;
  reaffecter_Display:boolean;
  multi_affecter: boolean;
  charges:any;
  constructor(
    public router: Router,
    public dialog: MatDialog,

    private ChargeApi: ListChargeService,
    public dialogRef: MatDialogRef<AffecterDossierComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}


  ngOnInit(): void {
  this.title_label = this.data.title_label;
  this.sub_title_label = this.data.sub_title_label;
  this.sub_title_label_1 = this.data.sub_title_label_1
  this.button_label_1 = this.data.button_label_1;
  this.button_label_2 = this.data.button_label_2;
  this.affecter_Display = this.data.affecter_Display;
  this.reaffecter_Display = this.data.reaffecter_Display;
  this.multi_affecter = this.data.multi_affecter;
  this.selectedFolder = this.data.selectedFolder;
  console.log('folder inf',this.selectedFolder);
  this.listAllCharge();
  }

  listAllCharge() {
    this.ChargeApi.getAllCharge().subscribe((data: any) => {
      this.charges = data.charges.filter(item => {
          if (item.enabled == "true") {
            return item
          }
        })
      console.log("nouv-chargés",this.charges);
    });
  }

  affecterForm = new FormGroup({
    action: new FormControl("affecter", [ Validators.required ]),
    agent: new FormControl("", [ Validators.required ]),
  });

  reaffecterForm = new FormGroup({
    agent: new FormControl("", [ Validators.required ]),
  });
  affectermultiForm = new FormGroup({
    dossiers: new FormControl("", [ Validators.required]),
    action: new FormControl("affecter", [ Validators.required ]),
    agent: new FormControl("", [ Validators.required ]),
  });

  public onSubmitMultiple(){
    this.affectermultiForm.value.dossiers = this.selectedFolder;
    console.log('Affectation en masse Api ...',this.affectermultiForm)
    this.dialogRef.close(this.affectermultiForm['value']);
  }

  openDialogAffecter() {
    this.dialogRef.close();
    this.dialog.open(SuccessMessageComponent, {
      width: '600px',
      height: '300px',
      data:{
        title_label: 'Le dossier a été affecté avec succès',
        sub_title_label: 'un mail a été envoyé au chargé',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });

    this.dialogRef.close(this.affecterForm['value']);
  }

  openDialogReaffecter() {
    this.dialogRef.close();
    this.dialog.open(SuccessMessageComponent, {
      width: '600px',
      height: '300px',
      data:{
        title_label: 'Le dossier a été réaffecté avec succès',
        sub_title_label: 'un mail  a été envoyé au chargé',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });

    this.dialogRef.close(this.reaffecterForm['value']);
  }

}
