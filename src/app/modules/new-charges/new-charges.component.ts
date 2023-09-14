import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit ,NgZone, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ListChargeService } from 'app/services/list-charges.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { PreviewService } from 'app/services/preview.service';
import { MustMatch } from './../../_helpers/must-match.validator';

@Component({
  selector: 'app-new-charges',
  templateUrl: './new-charges.component.html',
  styleUrls: ['./new-charges.component.css'],
  providers: [

    {provide: MAT_DATE_LOCALE, useValue: 'fr'},

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUt: true}}
  ],

})
export class NewChargesComponent implements OnInit {
  public id = this.actRoute.snapshot.params.id;
  public submitted = false;
  public selected:string;
  hide = true;
  hideConfirmation = true;
  dispo:string;
  nomCharge:string;
  prenomCharge:string;
  newCharge:string;
  codeCharge:string;
  New_Charge_Form:FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private ChargeApi: ListChargeService,
    private router: Router,
    private ngZone: NgZone,
  ) {}



  ngOnInit(): void {
    this.New_Charge_Form = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      email: ['', [Validators.required,Validators.email]],
      location:['', Validators.required],
      skypeId:['', Validators.required],
      password:['', Validators.required],
      confirmPassword: ['', Validators.required],
      "chm:adressechargee":['', Validators.required],
      "chm:disponibilite": ['', Validators.required],
      "chm:dateDeLaProchaineDisponibilite": ['', Validators.required],
      "chm:codePostalechargee": ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
      "chm:villechargee": ['', Validators.required],
      "chm:gouvernoratchargee": ['', Validators.required],
      "chm:motif": ['', Validators.required],
      "chm:palierMontant":['', Validators.required]

      }, {
      validator: MustMatch('password', 'confirmPassword')
      })

  };


  get passwordInput() { return this.New_Charge_Form.get('password'); }
  get confirmPasswordInput() { return this.New_Charge_Form.get('confirmPassword'); }

  public save() {
    console.log(this.New_Charge_Form.value ,'form data')
    if(this.New_Charge_Form.value['chm:disponibilite']=='true'){
    this.New_Charge_Form.controls['chm:dateDeLaProchaineDisponibilite'].setValue(new Date())
    this.New_Charge_Form.controls['chm:motif'].setValue('conge')
    };

    const NewChargeForm = {
      id:this.New_Charge_Form.value['firstName'],
      password:this.New_Charge_Form.value['password'],
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
                  }
      };
      const addToPersonGroup = {
        id: this.New_Charge_Form.value.firstName,
        memberType: "PERSON"
      };

      console.log(NewChargeForm ,'custom form data')

    this.submitted = true;
    console.log(this.New_Charge_Form.invalid,'invalid');
    if (this.New_Charge_Form.invalid) {

      console.log('form Non valid!');
    }
    else{
      this.ChargeApi.CreateCharge(NewChargeForm).subscribe({
        complete: () => {
          this.ngZone.run(() => this.router.navigateByUrl('/charges'));
          console.log('Chergé successfully created!');

          this.ChargeApi.AddChargeToChargeGroup(addToPersonGroup).subscribe({
            complete: () => {
            console.log('Chergé successfully added to person group !');
          }
          })
        },
        error:(e) => {
          console.log(e);
        },
      })

     }
    }


    onChange(){
      console.log(this.dispo )
      if(this.dispo=='false'){
        this.New_Charge_Form.controls['chm:motif'].setValue(null);
        this.New_Charge_Form.controls['chm:dateDeLaProchaineDisponibilite'].setValue(null);
      }
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

