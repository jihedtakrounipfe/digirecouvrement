import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit ,NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListChargeService } from 'app/services/list-charges.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { MatDialog } from '@angular/material/dialog';
import { PreviewService } from 'app/services/preview.service';
import { SupprimerConsulterChargeModalComponent } from 'app/shared/supprimer-consulter-charge-modal/supprimer-consulter-charge-modal.component';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-update-charge',
  templateUrl: './update-charges.component.html',
  styleUrls: ['./update-charges.component.css'],
})
export class UpdateChargesComponent implements OnInit {
  public id = this.actRoute.snapshot.params.id;
  public submitted = false;
  public selected:string;
  dispo:string;
  nomCharge:string;
  prenomCharge:string;
  newCharge:string;
  codeCharge:string;
  date: Date;
  gmtDate: string;

  constructor(
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private ChargeApi: ListChargeService,
    private router: Router,
    private ngZone: NgZone,
    private api:PreviewService,
    private dateAdapter: DateAdapter<Date>
  ) {this.dateAdapter.setLocale('fr');}



  ngOnInit(): void {
    this.getPerson()
  };

  New_Charge_Form = new FormGroup({

    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    telephone: new FormControl("", [Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
    email: new FormControl("", [Validators.required,,Validators.email]),
    location:new FormControl("", [Validators.required]),
    skypeId:new FormControl("", [Validators.required]),


    "chm:adressechargee": new FormControl("", [Validators.required]),
    "chm:disponibilite": new FormControl("", [Validators.required]),
    "chm:dateDeLaProchaineDisponibilite": new FormControl("", [Validators.required]),
    "chm:codePostalechargee": new FormControl("", [Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
    "chm:villechargee": new FormControl("", [Validators.required]),
    "chm:gouvernoratchargee": new FormControl("", [Validators.required]),
    "chm:motif": new FormControl('', [Validators.required]),
    "chm:palierMontant": new FormControl('', [Validators.required])

  })
key
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  adresseCharge
  codePostalCharge
  gouvernoratCharge
  profileCharge
  villeCharge
  getPerson() {

    this.ChargeApi.getChargeById(this.id).subscribe((data) => {
      console.log('chargé data',data)
      this.codeCharge=data.entry.properties["chm:codechargee"];
      this.nomCharge=data.entry["firstName"];
      this.prenomCharge=data.entry["lastName"];
      this.adresseCharge=data.entry.properties["chm:adressechargee"];
      this.codePostalCharge=data.entry.properties["chm:codePostalechargee"];
      this.gouvernoratCharge=data.entry.properties["chm:gouvernoratchargee"];
      this.profileCharge=data.entry["skypeId"];
      this.villeCharge=data.entry.properties["chm:villechargee"];
      let dispo = data.entry.properties["chm:disponibilite"].toString();
      if(dispo =='true'){data.entry.properties['chm:dateDeLaProchaineDisponibilite']=null}

      this.New_Charge_Form.setValue({
        firstName:data.entry["firstName"],
        lastName:data.entry["lastName"],
        email:data.entry["email"],
        telephone:data.entry["telephone"],
        location:data.entry["location"],
        skypeId:data.entry["skypeId"],
        "chm:adressechargee": data.entry.properties['chm:adressechargee'],
        "chm:disponibilite": data.entry.properties["chm:disponibilite"].toString(),
        "chm:dateDeLaProchaineDisponibilite": data.entry.properties['chm:dateDeLaProchaineDisponibilite'],
        "chm:codePostalechargee":  data.entry.properties['chm:codePostalechargee'],
        "chm:villechargee": data.entry.properties['chm:villechargee'],
        "chm:gouvernoratchargee": data.entry.properties['chm:gouvernoratchargee'],
        "chm:motif": data.entry.properties['chm:motif']?data.entry.properties['chm:motif']:"",
        "chm:palierMontant": data.entry.properties['chm:palierMontant']
      });
    });
  }

  public save() {
    // const updatedDispo = {
    //                "disponibilite": this.New_Charge_Form.value['chm:disponibilite']
    //   };
    // this.ChargeApi.updateChargeDispo(this.id , updatedDispo ).subscribe({
    //   complete: () => {
    //     console.log('Chergé successfully updated!'),
    //     this.ngZone.run(() => this.router.navigateByUrl('/charges'));
    //   },
    //   error: (e) => {
    //     console.log(e);
    //   },
    // });

    console.log('datepicker',this.New_Charge_Form.value['chm:dateDeLaProchaineDisponibilite']);
    console.log(this.New_Charge_Form.value ,'form data')

    if(this.New_Charge_Form.value['chm:disponibilite']=='true'){
    this.New_Charge_Form.controls['chm:dateDeLaProchaineDisponibilite'].setValue(new Date())
    this.New_Charge_Form.controls['chm:motif'].setValue('conge')
    };

    const updated = {
      email: this.New_Charge_Form.value['email'],
      emailNotificationsEnabled: true,
      enabled: true,
      firstName:this.New_Charge_Form.value['firstName'],
      lastName: this.New_Charge_Form.value['lastName'],
      telephone: this.New_Charge_Form.value['telephone'],
      skypeId:this.New_Charge_Form.value['skypeId'],
      location:this.New_Charge_Form.value.location,
      properties: {
                   "chm:adressechargee":  this.New_Charge_Form.value['chm:adressechargee'],
                   "chm:codePostalechargee":  this.New_Charge_Form.value['chm:codePostalechargee'],
                   "chm:villechargee": this.New_Charge_Form.value['chm:villechargee'],
                   "chm:disponibilite": this.New_Charge_Form.value['chm:disponibilite'],
                   "chm:dateDeLaProchaineDisponibilite":  this.New_Charge_Form.value['chm:dateDeLaProchaineDisponibilite'],
                   "chm:gouvernoratchargee": this.New_Charge_Form.value['chm:gouvernoratchargee'],
                   "chm:motif": this.New_Charge_Form.value['chm:motif'],
                   "chm:palierMontant": this.New_Charge_Form.value['chm:palierMontant']
                  },
      };
      console.log(updated ,'custom form data')

    this.submitted = true;
    console.log(this.New_Charge_Form.invalid,'invalid');
    if (this.New_Charge_Form.invalid) {

       console.log('form Non valid!');
    }
    else{
      this.ChargeApi.updateCharge(this.id , updated ).subscribe({
        complete: () => {
          console.log('Chergé successfully updated!'),
          this.ngZone.run(() => this.router.navigateByUrl('/charges'));
        },
        error: (e) => {
          console.log(e);
        },
      });
      }
    }
    setDate(newdate: string) {
      const _ = moment();
      const date = moment(newdate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()});
      this.date = date.toDate();
      this.gmtDate = new DatePipe('en-Us').transform(date, 'full', '+530');
    }
    onChange(){
      console.log(this.dispo )
      if(this.dispo=='false'){
        this.New_Charge_Form.controls['chm:motif'].setValue(null);
        this.New_Charge_Form.controls['chm:dateDeLaProchaineDisponibilite'].setValue(null);
      }

    }
    public openRemplacerDialog() {
      console.log(this.nomCharge)
     const dialogRef = this.dialog.open(SupprimerConsulterChargeModalComponent, {
       width: '550px',
       height: '450px',
       data: {
         numSelected: this.nomCharge,
         title_label: 'Remplacer le chargé',
         sub_title_label: `Voulez-vous remplacer le(s) chargé(s)`,
         button_label_1: 'Annuler',
         button_label_2: 'OK',
         Supprimer_Display:false,
         Remplacer_Display:true,
         ShoWOldcharge:false
       }
     });

     dialogRef.afterClosed().subscribe(res => {res ;console.log('subscription',res);
     this.newCharge = res[1].newCharge;
     this.ChargeApi.RemplacerCharge( this.nomCharge , this.newCharge ).subscribe({
         complete: () => {
           console.log('Chergé successfully replaced!');
           console.log('Replaced',res);
           this.api.OpenSuccessDialog();
         },
         error: (e) => {
             console.log(e);
           },
         })
       });

   }

  gouvernorat = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kébili',
    'Kef',
    'Mahdia',
    'Manouba',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];
  palier = [
    '0 - 10 000',
    '10 000 - 100 000',
    '500 000 - 1 000 000',
    'illimité',
  ];
  profile = [
    'Junior',
    'Confirmé',
    'Senior'
  ];
}

