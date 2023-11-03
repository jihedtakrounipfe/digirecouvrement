import { MomentDateAdapter } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { PreviewService } from 'app/services/preview.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: 'app-new-versement',
  templateUrl: './new-versement.component.html',
  styleUrls: ['./new-versement.component.css'],
  providers: [

    {provide: MAT_DATE_LOCALE, useValue: 'fr'},

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class NewVersementComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  public reload:string;
  public nomDossier = this.route.snapshot.params.nomDossier;
  constructor(
    private dossiers: ListDossiersService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private api:PreviewService
  ) { }


  ngOnInit(): void {}

  New_Versement_Form = new FormGroup({
    dateVersement: new FormControl("", [ Validators.required]),
    montantVersement: new FormControl("", [ Validators.required]),
    modeReglement: new FormControl("", [ Validators.required]),
    affectaion: new FormControl("", [ Validators.required]),
    referenceVersement: new FormControl("", [ Validators.required]),
    typeVersement: new FormControl("", [ Validators.required]),

  });

  public save() {
    console.log('Versement form content',this.New_Versement_Form.value,this.nomDossier);
    const formData = new FormData();
    formData.append('dateVersement', this.New_Versement_Form.value.dateVersement);
    formData.append('montantVersement', this.New_Versement_Form.value.montantVersement);
    formData.append('modeReglement', this.New_Versement_Form.value.modeReglement);
    formData.append('affectaion', this.New_Versement_Form.value.affectaion);
    formData.append('referenceVersement', this.New_Versement_Form.value.referenceVersement);
    formData.append('typeVersement', this.New_Versement_Form.value.typeVersement);
    this.dossiers.CreateVersemntPrecontent(formData,this.nomDossier).subscribe({
      complete: () => {
        console.log('Versement successfully created!');
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

