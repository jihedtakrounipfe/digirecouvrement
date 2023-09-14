import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { PreviewService } from 'app/services/preview.service';
import { Subscription } from 'rxjs';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-update-detail-frais',
  templateUrl: './update-detail-frais.component.html',
  styleUrls: ['./update-detail-frais.component.css']
})
export class UpdateDetailFraisComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  public reload:string;
  public subscription:Subscription;
  public nomDossier = this.route.snapshot.params.nomDossier;
  submitted = false;
  param: number;
  frais:string;

  constructor( public dialog: MatDialog, private api: PreviewService , private route:ActivatedRoute ,private dossier:ListDossiersService) { }

  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription= this.api.fraisJdcTag.subscribe((data:any)=>{  data; console.log('selected elements',this.frais= data ,this.nomDossier)
    //subscriptions by nomEcheancier
    this.dossier.getFraisJudiciarebyName(this.nomDossier , this.frais).subscribe((data) => {
      console.log('FRAIS by id',data)
    this.updateForm.setValue({
      nom:data["nom"],
      prenom:data["prenom"],
      typedeTiers:data["typedeTiers"],
      facturation:data["facturation"],
      paiment:data["paiment"],
      typedeSaisine:data["typedeSaisine"],
      });
    });
  })
  }
   updateForm = new FormGroup({
    nom: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    prenom: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    typedeTiers: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    facturation: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    paiment: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    typedeSaisine: new FormControl("", [ Validators.required, Validators.minLength(3) ])
    });


  onSubmit() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Confirmer la modification !!!')) {
        this.dossier.updateFraisJudiciare( this.updateForm.value ,this.nomDossier ,this.frais ).subscribe({
          complete: () => {
            this.OpenSuccessDialog();
            console.log('Content updated successfully!');
            this.reloadData.emit(this.reload);
          },
          error: (e) => {
            console.log(e);
            this.api.OpenEchecDialog();
          },
        });
      }
    }
  }

  public OpenSuccessDialog() {
    this.dialog.open(SuccessMessageComponent, {
      width: '600px',
      height: '300px',
      data:{
        title_label: 'Succès',
        sub_title_label: 'Frais a été Modifié avec succès',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });
}
  echeancier:string[] = [ 'Trimestrielle', 'Mensuelle']
}
