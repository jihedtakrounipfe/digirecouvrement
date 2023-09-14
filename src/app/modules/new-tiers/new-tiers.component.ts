import { PreviewService } from 'app/services/preview.service';
import { ListTiersService } from './../../services/list-tiers.service';
import { Component, NgZone, OnInit, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { find, pull } from 'lodash';
@Component({
  selector: 'app-new-tiers',
  templateUrl: './new-tiers.component.html',
  styleUrls: ['./new-tiers.component.css']
})
export class NewTiersComponent implements OnInit {
  @Output() setReload = new EventEmitter();
  @ViewChild('tagInput') tagInputRef: ElementRef;
  public tags: string[] = [];
  public tiers = [ 'Avocat','Huissier','Expert'];
  public New_Tiers_Form:FormGroup;
  public submitted = false;
  public reloadTier:string ='reload';
  public ShowTelephoneForm:boolean= false;
  public phoneValidationText:boolean= false;
  constructor(
    private api:PreviewService,
    private ngZone: NgZone,
    private router: Router,
    public tiersApi: ListTiersService) { }

ngOnInit(): void {
  this.New_Tiers_Form  = new FormGroup({
      email: new FormControl("", [ Validators.required,Validators.email]),
      nom: new FormControl("", [ Validators.required]),
      adresse: new FormControl("", [ Validators.required]),
      prenom: new FormControl("", [ Validators.required]),
      telephone: new FormControl("", [ Validators.required,Validators.minLength(8)]),
      type: new FormControl("", [ Validators.required]),
      gouvernorat: new FormControl("", [ Validators.required]),
      codePostale: new FormControl("", [ Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
      ville: new FormControl("", [ Validators.required]),
      numeroFax:new FormControl("", [ Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      numeroFix:new FormControl("", [ Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      cin: new FormControl("", [ Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
  });
}

keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
  }
}

get f() { return this.New_Tiers_Form.controls; }

save(){
  const telephoneValue = this.tags.toString();
  console.log(telephoneValue,'telephoneValue');

  this.New_Tiers_Form.patchValue({
      telephone: telephoneValue
  });

  this.submitted = true;
  if (this.New_Tiers_Form.invalid) {
      console.log('form Non valid!');
  }
  else{
      console.log(this.New_Tiers_Form.value)
      this.tiersApi.createTiers(this.New_Tiers_Form.value).subscribe({
      complete: () => {
        console.log('Tiers successfully Created!'),
        this.ngZone.run(() => this.router.navigateByUrl('/tiers'));
        this.setReloadTiers();
      }
  })
  }

}
resetInput(){this.New_Tiers_Form.controls.telephone.setValue('');}
setReloadTiers(){
  this.api.SetReload(this.reloadTier),
  this.setReload.emit(this.reloadTier);
}

focusTagInput(): void {
  this.tagInputRef.nativeElement.focus();
}

onKeyUp(event: KeyboardEvent): void {
  const inputValue: string = this.New_Tiers_Form.controls.telephone.value;
  if (event.code === 'Backspace' && !inputValue) {
    this.removeTag();
    return;
  } else {
    if (event.code === 'Comma' || event.code === 'Space') {
      this.addTag(inputValue);
      console.log(this.New_Tiers_Form.controls.telephone.value)
      this.New_Tiers_Form.controls.telephone.setValue('');
    }
  }
  const len = this.New_Tiers_Form.controls.telephone.value.length;
  console.log(len)
  this.phoneValidationText=true;
  if (len == 8 || len == 0) {
     this.phoneValidationText = false;
  }

}

addTag(telephone: string): void {
  if (telephone[telephone.length - 1] === ',' || telephone[telephone.length - 1] === ' ') {
    telephone = telephone.slice(0, -1);
  }
  if (telephone.length > 0 && !find(this.tags , telephone)) {
    this.tags.push(telephone);
  }
  console.log(this.tags)
}

removeTag(telephone?: string): void {
  if (!!telephone) {
    pull(this.tags, telephone);
  } else {
    this.tags.splice(-1);
  }
}

}


