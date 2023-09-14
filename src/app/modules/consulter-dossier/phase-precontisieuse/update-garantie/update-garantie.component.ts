import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { Subscription } from 'rxjs';
import { PreviewService } from 'app/services/preview.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentDateAdapter } from '@alfresco/adf-core';

@Component({
  selector: 'app-update-garantie',
  templateUrl: './update-garantie.component.html',
  styleUrls: ['./update-garantie.component.css'],
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

export class UpdateGarantieComponent implements OnInit {
@Output() reloadData = new EventEmitter();
public reload:string;
  public subscription:Subscription;
  public nomDossier = this.route.snapshot.params.nomDossier;
  submitted = false;
  param: number;
  garantie:string;

  constructor(
    private dossiers: ListDossiersService,
    private route: ActivatedRoute,
    private api:PreviewService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription= this.api.garantieTag.subscribe((data:any)=>{  data; console.log('selected elements',this.garantie = data ,this.nomDossier)
    //subscriptions by nomEcheancier
    this.dossiers.getGarantiebyName(this.nomDossier , this.garantie).subscribe((data) => {
      console.log('garantie by id',this.garantie)
      this.updateForm.setValue({
        typeGar:data["typeGar"],
        natureHypotheque:data["natureHypotheque"],
        immatriculation:data["immatriculation"],
        rang:data["rang"],
        datefinhypotheque:data["datefinhypotheque"],
        montanthypotheque:data["montanthypotheque"],
        valeurestimee:data["valeurestimee"],
        hypothequebanque:data["hypothequebanque"],
        beneficiairehypotheque:data["beneficiairehypotheque"],
        });
    });
  })

  }

  updateForm= new FormGroup({
    typeGar: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    natureHypotheque: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    immatriculation: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    rang: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    datefinhypotheque: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    montanthypotheque: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    valeurestimee: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    hypothequebanque: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    beneficiairehypotheque: new FormControl("", [ Validators.required, Validators.minLength(3) ]),

  });

  onSubmit() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {

        this.dossiers.updateGarantie( this.updateForm.value ,this.nomDossier ,this.garantie ).subscribe({
          complete: () => {
            this.OpenSuccessDialog();
            console.log('Content updated successfully!');
            this.reloadData.emit(this.reload);
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
        sub_title_label: 'Garantie a été Modifié avec succès',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });
}
  Hypotheque:string[] = [
    'Hypothèque sur titre fonciers (TF)',
    'Hypothèque sur titre fonciers (TF)',
    'Hypothèque sur titre fonciers (TF)',
  ]
  Type:string[] = [
    'GAE',
    'ENQ',
  ]
  Autre:string[] = [
    'Oui',
    'Non',
  ]
}
