import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';

import { Subscription } from 'rxjs';
import { PreviewService } from 'app/services/preview.service';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@alfresco/adf-core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-update-frais',
  templateUrl: './update-frais.component.html',
  styleUrls: ['./update-frais.component.css'],
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

export class UpdateFraisComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  public reload:string;
  public subscription:Subscription;
  public nomDossier = this.route.snapshot.params.nomDossier;
  submitted = false;
  param: number;
  frais:string;
  setdata:any;
  constructor(
    private dossiers: ListDossiersService,
    private route: ActivatedRoute,
    private api:PreviewService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription= this.api.fraisTag.subscribe((data:any)=>{  data; console.log('selected elements',this.frais = data ,this.nomDossier)
    //subscriptions by nomEcheancier
    this.dossiers.getFraisbyName(this.nomDossier , this.frais).subscribe((data:any) => { this.setdata = data.fraisprecontentieuse[0]
      console.log('frais by id',this.setdata)
      this.updateForm.setValue({
        naturefrais:this.setdata["naturefrais"],
        typefrais:this.setdata["typefrais"],
        tiers:this.setdata["tiers"],
        montants:this.setdata["montants"],
        datedeffdesir:this.setdata["datedeffdesir"],
        referencePvFacture:this.setdata["referencePvFacture"],
        debours:this.setdata["debours"],
        HT:this.setdata["HT"],
        TVA:this.setdata["TVA"],
        });
    });
  })

  }
  updateForm = new FormGroup({
    naturefrais: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    typefrais: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    tiers: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    montants: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    datedeffdesir: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    referencePvFacture: new FormControl("", [Validators.required, Validators.minLength(3)]),
    HT: new FormControl("", [Validators.required, Validators.minLength(3)]),
    TVA: new FormControl("", [Validators.required, Validators.minLength(3)]),
    debours: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  onSubmit() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('confirmer?')) {

        this.dossiers.updateFrais( this.updateForm.value ,this.nomDossier ,this.frais ).subscribe({
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
        sub_title_label: 'Frais a été Modifié avec succès',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });
}

 type:string[] = [
    'frais 1',
    'frais 2',
    'frais 3',
    'frais 4',
    'frais 5',
  ]
  versement:string[] = [
    'Signification',
    'Affaire au fonds',
    'Expert',
  ]
}

