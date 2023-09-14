
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessMessageComponent } from '../success-message/success-message.component';
import { ListChargeService } from 'app/services/list-charges.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signaler-dossier',
  templateUrl: './signaler-dossier.component.html',
  styleUrls: ['./signaler-dossier.component.css']
})
export class SignalerDossierComponent implements OnInit {

public listCharges:any;
constructor(
  public router: Router,
  public dialog: MatDialog,
  private charges: ListChargeService,
  public dialogRef: MatDialogRef<SignalerDossierComponent>,
) { }


ngOnInit(): void {

this.getAllCharge();
}
getAllCharge() {
   this.charges.getAllCharge().subscribe((data:any)=>{this.listCharges = data.charges;
   console.log('list',this.listCharges)})
}

signalerForm = new FormGroup({
  agent: new FormControl("aymen", [ Validators.required ]),
  action: new FormControl("signaler", [ Validators.required ]),
});

openDialogSignialerDossier() {
      this.dialogRef.close();
      this.dialog.open(SuccessMessageComponent, {
        width: '600px',
        height: '300px',
        data:{
          title_label: 'Le dossier a été signalé avec succès',
          sub_title_label: 'un mail a été envoyer au débiteur',
          button_label: 'Ok',
          success_icon:true,
          echec_icon:false
        }
      });
     this.dialogRef.close(this.signalerForm['value']);
}

}
