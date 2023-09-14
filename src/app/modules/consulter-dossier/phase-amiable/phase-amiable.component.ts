import { Subscription } from 'rxjs';
import { Component, OnInit, Output, ViewChild,EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { PreviewService } from 'app/services/preview.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MessageRelanceModalComponent } from 'app/shared/message-relance-modal/message-relance-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { find, pull } from 'lodash';
@Component({
  selector: 'app-phase-amiable',
  templateUrl: './phase-amiable.component.html',
  styleUrls: ['./phase-amiable.component.css']
})
export class PhaseAmiableComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter();
  @Output() setInfReload = new EventEmitter();
  @ViewChild('tagInput') tagInputRef: ElementRef;
  @ViewChild (MatPaginator) paginator: MatPaginator;
  ListCodes=['2035','2001','2027','2036','2080','2002','2091','2083','9070','9040','9000','9032','2098','1145'];
  public displayedTabColumns: string[] = ['select','periodicite','montant','datePremiereEcheancier'];
  public nomDossier = this.route.snapshot.params.nomDossier;
  public phoneValidationText=false;
  public ShowCodeForm:boolean = false;
  public reload:boolean = true;
  public list:boolean = true;
  public add:boolean = false;
  public updateForm:boolean = false;
  public amiable:string;
  public echeancier:any;
  public session: string;
  public telephone:string;
  public ArrayPhone:string[]=[];
  public isReadOnly:boolean = true;
  public statutAppel:string;
  public statutMessage:string;
  public TypeRelance:string;
  public selection = new SelectionModel<Element>(true, []);
  public subscription:Subscription;
  public GetCode:any;
  public nombreMessageDeRappel:string;
  public nombreAppel:string;
  public successPhone:boolean=false;
  public successCode:boolean=false;
  tags: string[] = [];
  form: FormGroup;
  typeRelanceNotificationTimer:boolean=true;
  constructor(
    public dialog: MatDialog,
    //public dialogRef: MatDialogRef<MessageRelanceModalComponent>,
    private dossiers : ListDossiersService,
    private api: PreviewService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {  }

  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription = this.api.castTag.subscribe(data=>{ this.session = data})
    if(this.session =='GROUP_CHARGES'){
      this.isReadOnly=false;
    }
    this.getAllEchenciers();
    this.getCodePostale();
    this.UpdatePhoneNumber();

  }

  getAllEchenciers(){
    //subscriptions by folder informations
    this.dossiers.getDossierByName(this.nomDossier).subscribe((data:any) =>{
    this.amiable = data.phaseAmiable[0];
    this.echeancier =  new MatTableDataSource(data.echeancier);
    this.echeancier.paginator = this.paginator;
    this.statutAppel = data.phaseAmiable[0]['statutAppel'];
    this.statutMessage= data.phaseAmiable[0]['statutMessage'];
    this.telephone= data.phaseAmiable[0]['telephone'];
    this.TypeRelance= data.phaseAmiable[0]['typeRelance'];
    this.nombreMessageDeRappel= data.phaseAmiable[0]['nombreMessageDeRappel'];
    this.nombreAppel= data.phaseAmiable[0]['nombreAppel'];
    console.log(this.TypeRelance)
    this.ArrayPhone = this.telephone.split(',');
    if(this.updateCode.value.codepostale !== ''){
      data.phaseAmiable[0]['gouvernorat'] = this.GetCode.filteredData[0].gouvernorat;
      data.phaseAmiable[0]['ville'] = this.GetCode.filteredData[0].ville;
      data.phaseAmiable[0]['codepostale']= this.GetCode.filteredData[0].code;
    }
    //this.updateTelephone.setValue({telephone:this.ArrayPhone});
    this.tags=this.ArrayPhone;
    this.updateCode.setValue({gouvernorat: data.phaseAmiable[0]['gouvernorat'] , ville: data.phaseAmiable[0]['ville'], codepostale: data.phaseAmiable[0]['codepostale'] });
    console.log('statutAppel',this.statutAppel );
    console.log('statutMessage',this.statutMessage);
    });
  }
  updateTelephone = new FormGroup({
    telephone: new FormControl("")
  });
  updateCode = new FormGroup({
    gouvernorat: new FormControl(""),
    ville: new FormControl(""),
    codepostale: new FormControl("")
  });

  Reload(event){
    console.log(event,'reload event')
    this.getAllEchenciers();
    this.show();
  }
  selectEcheancier(Selected){
   console.log('Selected ech',Selected)
    this.api.SetSelctedEch(Selected);
    this.newItemEvent.emit(Selected)
  }

  hide(){
    this.list = false;
    this.add = !this.add;
    if(this.add=true){
      this.list = false;
      this.updateForm=false
    }
  }

  show(){
    this.add = true;
    this.list = !this.list;
    if(this.list=true){
      this.add = false;
      this.updateForm=false
    }
  }

  update(){
    this.updateForm = true;
    this.list = !this.list;
    if(this.updateForm=true){
      this.add = false;
      this.list=false
     }
  }

  public openReclamationModal(){
    console.log(this.telephone)
    const dialogRef =  this.dialog.open(MessageRelanceModalComponent, {
      width: '600px',
      height: '430px',
      data:{
        telephone:this.telephone,
        title_label: 'Déposer une réclamation',
        sub_title_label_1: 'Type de la réclamation',
        sub_title_label_2: 'Message de la réclamation',
        button_label_1: 'Annuler',
        button_label_2: 'Ok',
        Reclamation:true,
        sms:false,
        appel:false,
        paymentform:false
      }
    });
    dialogRef.afterClosed().subscribe(res => {res ;console.log("after close reclamation",res)
    this.dossiers.EnvoyerReclamation( res , this.nomDossier).subscribe({
      complete: () => {
        this.api.SetinfReload(this.reload);
        this.setInfReload.emit(this.reload);
        console.log('Réclamation submitted !!!');
        this.getAllEchenciers();
      },
      error: (e) => {
        console.log(e);
      }})
    });

  }
  public openSMSmodal(){
    const dialogRef = this.dialog.open(MessageRelanceModalComponent, {
      width: '600px',
      height: '430px',
      data:{
        telephone:this.telephone,
        title_label: 'Envoi d’un SMS',
        sub_title_label_1: 'Numéro du téléphone du destinataire',
        sub_title_label_2: 'Message',
        button_label_1: 'Annuler',
        button_label_2: 'Ok',
        Reclamation:false,
        sms:true,
        appel:false,
        paymentform:false
      }
    });
    dialogRef.afterClosed().subscribe(res => {res ;console.log("after close sms",res)
    this.ngOnInit();
    this.dossiers.EnvoyerSMS( res , this.nomDossier).subscribe({

      complete: () => {
        this.getAllEchenciers();
        console.log('Envoi d’un SMS submitted !!!');
        this.api.SetinfReload(this.reload);
        this.setInfReload.emit(this.reload);
        this.getAllEchenciers();
      },
      error: (e) => {
        console.log(e);
      }})
    });
  }
  public openAppelModal(){
    const dialogRef =  this.dialog.open(MessageRelanceModalComponent, {
      width:'600px',
      height:'430px',
      data:{
        telephone:this.telephone,
        title_label: 'Appel téléphonique',
        sub_title_label_1: 'Numéro du téléphone du destinataire',
        sub_title_label_2: 'Message',
        button_label_1: 'Annuler',
        button_label_2: 'Appeler',
        Reclamation:false,
        sms:false,
        appel:true,
        paymentform:false,
      }
    });
    dialogRef.afterClosed().subscribe(res => {res ;console.log("after close Appel",res)
    this.dossiers.AppelerDebiteur( res , this.nomDossier).subscribe({
    complete: () => {
      this.api.SetinfReload(this.reload);
      this.setInfReload.emit(this.reload);
      console.log('Appeler Debiteur submitted !!!');
      this.getAllEchenciers();
    },
    error: (e) => {
      console.log(e);
    }})
    });
  }

  saveNewPhone(){
    console.log(this.updateTelephone.value.telephone,'update phone val')
    // this.Update_Tiers_Form.value.telephone = this.tags.toString();
    const updatedNum = { telephone:this.tags.toString()}
    this.dossiers.updateTelephone( updatedNum ,this.nomDossier ).subscribe({
      complete: () => {
        console.log('Phone updated successfully!');
        this.api.SetinfReload(this.reload);
        this.setInfReload.emit(this.reload);
        this.getAllEchenciers();
        this.successPhone=true
        this.phoneValidationText = false;
        setTimeout(()=> { this.successPhone=false },4000);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  saveNewCode(){
    console.log(this.updateCode.value.codepostale,'update val')
    let codePost = this.updateCode.value.codepostale;
    codePost = codePost.trim();
    codePost = codePost.toLowerCase();
    this.GetCode.filter = codePost;

    this.updateCode.setValue({gouvernorat: this.GetCode.filteredData[0].gouvernorat , ville: this.GetCode.filteredData[0].ville, codepostale: this.GetCode.filteredData[0].code });
    console.log(this.updateCode,'update code postale val')

    const updatedCode = {
      gouvernorat:this.updateCode.value.gouvernorat,
      ville:this.updateCode.value.ville,
      codepostale:this.updateCode.value.codepostale}
    this.dossiers.updateCodePostale( updatedCode ,this.nomDossier ).subscribe({
      complete: () => {
        console.log('Code postale updated successfully!');
        this.api.SetinfReload(this.reload);
        this.setInfReload.emit(this.reload);
        this.getAllEchenciers();
        this. successCode=true
        setTimeout(()=> { this. successCode=false },4000);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

openCodeForm(){
  this.ShowCodeForm = !this.ShowCodeForm;
}

getCodePostale(){
  this.api.getCodePostale().subscribe(res => {
  this.GetCode = new MatTableDataSource(res);
 });
}

onChange() {
  console.log(this.telephone);
}

UpdatePhoneNumber(){
  this.form = this.fb.group({
    tag: ['', Validators.required, Validators.minLength(8),Validators.maxLength(8)],
  });
  console.log(this.tags)
}

focusTagInput(): void {
  this.tagInputRef.nativeElement.focus();
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
  if (len == 8 || len ==0) {
  this.phoneValidationText = false;
 }
}
keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode !== 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

}
