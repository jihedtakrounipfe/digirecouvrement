import { MomentDateAdapter } from '@alfresco/adf-core';
import { MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { PreviewService } from 'app/services/preview.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: 'app-new-garantie',
  templateUrl: './new-garantie.component.html',
  styleUrls: ['./new-garantie.component.css'],
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
export class NewGarantieComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  public reload:string;
  public nomDossier = this.route.snapshot.params.nomDossier;
  constructor(
    private dossiers: ListDossiersService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api:PreviewService
  ) { }


  ngOnInit(): void {
  }
  New_Garantie_Form = new FormGroup({
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

  public save() {

    console.log('Garantie form content',this.New_Garantie_Form .value,this.nomDossier);
    this.dossiers.CreateGarantie(this. New_Garantie_Form .value,this.nomDossier).subscribe({
      complete: () => {
        console.log('Garantie successfully created!');
        this.OpenSuccessDialog();
        this.reloadData.emit(this.reload);
      },
      error: (e) => {
        console.log(e);
        this.api.OpenEchecDialog();
      },
    });
    }

    public OpenSuccessDialog() {
      this.dialog.open(SuccessMessageComponent, {
        width: '600px',
        height: '300px',
        data:{
          title_label: 'Succès',
          sub_title_label: 'Grantie a été ajouté avec succès',
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

