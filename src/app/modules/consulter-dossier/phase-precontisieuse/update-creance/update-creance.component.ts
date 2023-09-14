import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { Subscription } from 'rxjs';
import { PreviewService } from 'app/services/preview.service';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentDateAdapter } from '@alfresco/adf-core';

@Component({
  selector: 'app-update-creance',
  templateUrl: './update-creance.component.html',
  styleUrls: ['./update-creance.component.css'],
  providers: [

    {provide: MAT_DATE_LOCALE, useValue: 'fr'},

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class UpdateCreanceComponent implements OnInit {
@Output() reloadData = new EventEmitter();
public reload:string;
  public subscription:Subscription;
  public nomDossier = this.route.snapshot.params.nomDossier;
  submitted = false;
  param: number;
  creance:string;

  constructor(
    private dossiers: ListDossiersService,
    private route: ActivatedRoute,
    private api:PreviewService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription= this.api.creanceTag.subscribe((data:any)=>{  data; console.log('selected elements',this.creance = data ,this.nomDossier)
    //subscriptions by nomEcheancier
    this.dossiers.getCreancebyName(this.nomDossier , this.creance).subscribe((data) => {
      console.log('cre by id',this.creance)
      this.updateForm.setValue({
        nomcreance:data["nomcreance"],
        montant:data["montant"],
        nature:data["nature"],
        datedeffdesir:data["datedeffdesir"],
        });
      });
    })
  }
    updateForm = new FormGroup({
    nomcreance: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    montant: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    nature: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    datedeffdesir: new FormControl("", [ Validators.required, Validators.minLength(3) ]),

  });

  onSubmit() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {

        this.dossiers.updateCreance( this.updateForm.value ,this.nomDossier ,this.creance ).subscribe({
          complete: () => {
            this.OpenSuccessDialog();
            this.reloadData.emit(this.reload);
            console.log('Content updated successfully!');
          },
          error: (e) => {
            this.api.OpenEchecDialog();
            console.log(e);
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
        sub_title_label: 'Créance a été Modifié avec succès',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });
}
    creances:string[] = [
      'creance 1',
      'creance 2',
      'cerance 3',
      'creance 4',
      'creance 5',
    ]
    natureCR:string[] = [
      'Encours crédit',
      'Compte dépôt',
      'Découvert',
    ]
}
