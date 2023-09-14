import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { PreviewService } from 'app/services/preview.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@alfresco/adf-core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-new-frais',
  templateUrl: './new-frais.component.html',
  styleUrls: ['./new-frais.component.css'],
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
export class NewFraisComponent implements OnInit {
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
  New_Frais_Form = new FormGroup({
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

  public save() {

    console.log('Echeancier form content',this.New_Frais_Form.value,this.nomDossier);
    this.dossiers.CreateFrais(this.New_Frais_Form.value,this.nomDossier).subscribe({
      complete: () => {
        console.log('Echeancier successfully created!');
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
          sub_title_label: 'Frais a été ajouté avec succès',
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

