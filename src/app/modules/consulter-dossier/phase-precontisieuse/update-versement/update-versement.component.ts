import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
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

@Component({
  selector: 'app-update-versement',
  templateUrl: './update-versement.component.html',
  styleUrls: ['./update-versement.component.css'],
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

export class UpdateVersementComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  public reload:string;
  public subscription:Subscription;
  public nomDossier = this.route.snapshot.params.nomDossier;
  submitted = false;
  param: number;
  versement:string;

  constructor(
    private dossiers: ListDossiersService,
    private route: ActivatedRoute,
    private api:PreviewService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription= this.api.versementTag.subscribe((data:any)=>{  data; console.log('selected elements',this.versement = data ,this.nomDossier)
    //subscriptions by nomEcheancier
    this.dossiers.getVersementName(this.nomDossier , this.versement).subscribe((data) => {
      console.log('Versement by id',this.versement)
      this.updateForm.setValue({
        dateVersement:data["dateVersement"],
        montantVersement:data["montantVersement"],
        modeReglement:data["modeReglement"],
        affectaion:data["affectaion"],
        referenceVersement:data["referenceVersement"],
        typeVersement:data["typeVersement"],
        });

    });

  })

  }

  updateForm = new FormGroup({
    dateVersement: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    montantVersement: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    modeReglement: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    affectaion: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    referenceVersement: new FormControl("", [ Validators.required, Validators.minLength(3)]),
    typeVersement: new FormControl("", [ Validators.required, Validators.minLength(3)]),
  });

  save() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Es-tu sûr?')) {

        this.dossiers.updateVersement( this.updateForm.value ,this.nomDossier ,this.versement ).subscribe({
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
        sub_title_label: 'Versement a été Modifié avec succès',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });
}
  affectation:string[] = [
    'affectation 1',
    'affectation 2',
    'affectation 3',
  ]
  mode:string[] = [
    'versement',
    'chéque',
  ]
}
