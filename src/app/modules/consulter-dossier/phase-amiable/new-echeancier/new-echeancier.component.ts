import { PreviewService } from 'app/services/preview.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { MatDialog } from '@angular/material/dialog';
import { MomentDateAdapter } from '@alfresco/adf-core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-echeancier',
  templateUrl: './new-echeancier.component.html',
  styleUrls: ['./new-echeancier.component.css'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: 'fr'},

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],

})
export class NewEcheancierComponent implements OnInit {
  hour=0
  minute=0
  hourValue="00"
  minuteValue="00"
pipe = new DatePipe('fr-FR');
  @Output() reloadData = new EventEmitter();
  reload:string
  public nomDossier = this.route.snapshot.params.nomDossier;
  constructor(
    private dossiers: ListDossiersService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api:PreviewService
  ) { }

  ngOnInit(): void {

  }
    New_Echeancier_Form = new FormGroup({
    periodicite: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    montant: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    datePremiereEcheancier: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    heure: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    });
    CustomDate
  public save() {
    this.New_Echeancier_Form.value.heure = this.hourValue+':'+this.minuteValue;
    console.log(this.New_Echeancier_Form.value.heure)
    var NewDate =  new Date (this.New_Echeancier_Form.value.datePremiereEcheancier);
    NewDate.setDate( new Date (this.New_Echeancier_Form.value.datePremiereEcheancier).getDate());
    NewDate.toLocaleDateString();
    this.CustomDate = this.pipe.transform(NewDate,'yyyy-MM-dd');
    this.New_Echeancier_Form.value.datePremiereEcheancier =this.CustomDate+'T'+this.New_Echeancier_Form.value.heure+':00Z';

    const NewEcheancier = {
      periodicite:this.New_Echeancier_Form.value.periodicite,
      montant:this.New_Echeancier_Form.value.montant,
      datePremiereEcheancier:this.New_Echeancier_Form.value.datePremiereEcheancier,
    }
    console.log(NewEcheancier)
    this.dossiers.CreateEcheancier(NewEcheancier,this.nomDossier).subscribe({
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

  public OpenSuccessDialog(){
      this.dialog.open(SuccessMessageComponent, {
        width: '600px',
        height: '300px',
        data:{
          title_label: 'Succès',
          sub_title_label: 'Echeancier a été ajouté avec succès',
          button_label: 'Ok',
          success_icon:true,
          echec_icon:false
        }
      });
  }

  echeancier:string[] = [ 'Trimestrielle', 'Mensuelle']

  hour_up(){
    this.hour++;
    if (this.hour == 0  ) {
      this.hourValue='00';
    }
    else if (this.hour > 23) {
      this.hour = 0;
    }
    else if (this.hour < 10 && this.hour > 0  ) {
      this.hourValue = '0'+ this.hour;
    }

    else { this.hourValue = this.hour.toString();}
    }

  hour_down () {
    this.hour--;
    if (this.hour == 0  ) {
      this.hourValue='00';
    }
    else if (this.hour < 1) {
      this.hour = 24;
    }
    else if (this.hour < 10 && this.hour > 0  ) {
      this.hourValue = '0'+ this.hour;
    }
    else { this.hourValue = this.hour.toString();}
  }

  minute_up () {
    this.minute++;
    if (this.minute == 0  ) {
      this.minuteValue='00';
    }
    else if  (this.minute > 59) {
      this.minute = 0;
    }
    else if (this.minute < 10 && this.minute > 0  ) {
      this.minuteValue = '0'+ this.minute;
    }
    else { this.minuteValue = this.minute.toString();}
  }
  minute_down () {
    this.minute--;
    if (this.minute == 0  ) {
      this.minuteValue='00'
    }
    else if (this.minute < 1) {
      this.minute = 60;
    }
    else if (this.minute < 10 && this.minute > 0  ) {
      this.minuteValue = '0'+ this.minute;
    }
    else { this.minuteValue = this.minute.toString();}
  }

}
