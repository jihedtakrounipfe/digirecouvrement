import { Component, OnInit,NgZone, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListTiersService } from 'app/services/list-tiers.service';
import { find, pull } from 'lodash';
@Component({
  selector: 'app-update-tier',
  templateUrl: './update-tiers.component.html',
  styleUrls: ['./update-tiers.component.css']
})
export class UpdateTiersComponent implements OnInit {
  public tiersNom = this.route.snapshot.params.tiersNom;
  @ViewChild('tagInput') tagInputRef: ElementRef;
  TierTelephone:string;
  ArrayPhone:any;
  TierFirstName:string;
  TierLastName:string;
  TierCin: string
  phoneValidationText:boolean = false;
  tags: string[] = [];
  form: FormGroup;
  constructor(private ngZone: NgZone,private router: Router,public tiersApi: ListTiersService, private route: ActivatedRoute ,private fb: FormBuilder) { }
  submitted = false;
  ngOnInit(): void {
  this.UpdatePhoneNumber();
  this.getPerson()
  }

  getPerson() {
    console.log('update',this.tiersNom)
    this.tiersApi.getTierbyName(this.tiersNom).subscribe((data) => {
      this.TierFirstName=data["nom"]
      this.TierLastName=data["prenom"]
      this.TierTelephone=data["telephone"]
      this.TierCin = data["cin"]
      console.log(this.TierTelephone)
      this.ArrayPhone = this.TierTelephone.split(',');
      this.Update_Tiers_Form.setValue({
        email:data["email"],
        nom:data["nom"],
        adresse:data["adresse"],
        prenom:data["prenom"],
        telephone:this.ArrayPhone,
        type:data["type"],
        gouvernorat:data["gouvernorat"],
        codePostale:data["codePostale"],
        ville:data["ville"],
        statut:data["statut"],
        numeroFax:data["numeroFax"],
        numeroFix:data["numeroFix"],
        cin:data["cin"],
        });
        this.tags=this.ArrayPhone
      });
}

  Update_Tiers_Form = new FormGroup({
    email: new FormControl("", [ Validators.required,Validators.email]),
    nom: new FormControl("", [ Validators.required]),
    adresse: new FormControl("", [ Validators.required]),
    prenom: new FormControl("", [ Validators.required]),
    telephone: new FormControl("", [ Validators.required]),
    type: new FormControl("", [ Validators.required]),
    gouvernorat: new FormControl("", [ Validators.required]),
    codePostale: new FormControl("", [ Validators.required]),
    ville: new FormControl("", [ Validators.required]),
    statut:new FormControl("", [ Validators.required ]),
    numeroFax:new FormControl("", [ Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
    numeroFix:new FormControl("", [ Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
    cin: new FormControl("", [ Validators.required]),

  });

  public save(){
    this.submitted = true;
    if (!this.Update_Tiers_Form.valid) {
      return false;
    } else {
      this.Update_Tiers_Form.value.telephone = this.tags.toString();
      console.log( this.Update_Tiers_Form.value.telephone);
      return this.tiersApi.updateTiers(this.tiersNom , this.Update_Tiers_Form.value).subscribe({
          complete: () => {
            console.log('Tiers successfully Updated!'),
            this.ngZone.run(() => this.router.navigateByUrl('/tiers'));
          },
          error: (e) => {
            console.log(e);
          },
        })
    }
  }

  tiers = [
    'Avocat',
    'Huissier',
    'Expert'
  ];
  UpdatePhoneNumber(){
    this.form = this.fb.group({
      tag: [''],
    });
    console.log(this.tags)
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }
  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.form.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.form.controls.tag.setValue('');
      }
    }
    const len = this.form.controls.tag.value.length;
    console.log(len)
    this.phoneValidationText=true;
    if (len == 8 || len == 0) {
       this.phoneValidationText = false;
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags , tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }

}
