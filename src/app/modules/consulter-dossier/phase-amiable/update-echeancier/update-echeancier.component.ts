import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ListDossiersService } from './../../../../services/list-dossiers.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, Output ,EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { PreviewService } from 'app/services/preview.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { MomentDateAdapter } from '@alfresco/adf-core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-echeancier',
  templateUrl: './update-echeancier.component.html',
  styleUrls: ['./update-echeancier.component.css'],
})
export class UpdateEcheancierComponent implements OnInit {
  pipe = new DatePipe('fr-FR');
  @Output() reloadData = new EventEmitter();
  public reload:string
  public subscription:Subscription;
  public nomDossier = this.route.snapshot.params.nomDossier;
  public submitted = false;
  public echeanciers:string;
  public CustomDate:any;
  constructor( @Inject(LOCALE_ID) private _locale: string,
    private api: PreviewService ,
    private route:ActivatedRoute ,
    private dossier:ListDossiersService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
    ) {this.dateAdapter.setLocale('fr');   }


  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription= this.api.echeancierTag.subscribe((data:any)=>{  this.echeanciers = data; console.log('selected elements', data ,this.nomDossier)
    //subscriptions by nomEcheancier
    this.dossier.getEcheancierbyName(this.nomDossier , this.echeanciers).subscribe((echeancier) => {
    console.log('info echeancier by id',echeancier)
    this.CustomDate = this.pipe.transform(echeancier["datePremiereEcheancier"], 'yyyy-MM-dd'+'T23:00:00.000Z');
    console.log('CustomDate',this.CustomDate)
    var NewDate =  new Date (this.CustomDate);
    NewDate.setDate( new Date (this.CustomDate).getDate());
    NewDate.toLocaleDateString();

      this.updateForm.setValue({
        periodicite:echeancier["periodicite"],
        montant:echeancier["montant"],
        datePremiereEcheancier:new Date(NewDate),
        });

    });

  })

  }
   updateForm = new FormGroup({
    periodicite: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    montant: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    datePremiereEcheancier: new FormControl("", [ Validators.required, Validators.minLength(3) ]),

    });


  onSubmit() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {

        this.dossier.updateEcheancier( this.updateForm.value ,this.nomDossier ,this.echeanciers ).subscribe({
          complete: () => {
            this.OpenSuccessDialog();
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
            this.api.OpenEchecDialog();
            this.reloadData.emit(this.reload);
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
        sub_title_label: 'Echeancier a été modifié avec succès',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });
  }
  echeancier:string[] = [ 'Trimestrielle', 'Mensuelle']
}
