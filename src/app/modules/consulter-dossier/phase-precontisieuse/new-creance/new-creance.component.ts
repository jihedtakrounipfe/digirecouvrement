import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PreviewService } from 'app/services/preview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { MomentDateAdapter } from '@alfresco/adf-core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-new-creance',
  templateUrl: './new-creance.component.html',
  styleUrls: ['./new-creance.component.css'],
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
export class NewCreanceComponent implements OnInit {
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
  New_Crance_Form = new FormGroup({
    nomcreance: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    montant: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    nature: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    datedeffdesir: new FormControl("", [ Validators.required, Validators.minLength(3) ]),

  });

   // This function will be called when the date is changed
   onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = new Date(event.value);
      selectedDate.setDate(selectedDate.getDate() + 1); // Add one day

      this.New_Crance_Form.controls.datedeffdesir.setValue(selectedDate.toISOString());
    }
  }

  public save() {

    console.log('Echeancier form content',this.New_Crance_Form.value,this.nomDossier);
    this.dossiers.CreateCreance(this.New_Crance_Form.value,this.nomDossier).subscribe({
      complete: () => {
        console.log('Creance successfully created!');
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
          sub_title_label: 'Creance a été ajouté avec succès',
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
