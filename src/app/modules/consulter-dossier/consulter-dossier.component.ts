import { ConfirmationModalComponent } from './../../shared/confirmation-modal/confirmation-modal.component';
import { PreviewService } from 'app/services/preview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input ,OnInit } from '@angular/core';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { BooleanEditorComponent } from '@alfresco/adf-core';


@Component({
  selector: 'app-consulter-dossier',
  templateUrl: './consulter-dossier.component.html',
  styleUrls: ['./consulter-dossier.component.css']
})
export class ConsulterDossierComponent implements OnInit {
  public subscription:Subscription;
  public session: string;
  public dossierInf:any;
  public statutAppel:string;
  public statusPrecontentieuse:string;
  public statusAmiable:string;
  public nomDossier = this.route.snapshot.params.nomDossier;
  public TypeRelance:string;
  typeRelanceNotificationTimer:boolean=false;
  constructor(
    private dossiers : ListDossiersService,
    private api: PreviewService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  //subscriptions by BehaviorSubject
    this.subscription =this.api.castTag.subscribe(data=>{ this.session = data })
    this.getFolderById();
    this.subscription = this.api.ReloadConsulterTag.subscribe(data =>{
      this.getFolderById();
      console.log('reload API',data);
    })
    this.setNotif()
  }
  setNotif(){ this.typeRelanceNotificationTimer=true
    setTimeout(()=> { this.typeRelanceNotificationTimer=false },5000);
  }
  getFolderById(){
  //subscriptions folder Informations
  this.dossiers.getDossierByName(this.nomDossier).subscribe((data:any) =>{
    this.dossierInf = data.phaseAmiable[0];
    this.TypeRelance= data.phaseAmiable[0]['typeRelance'];
    this.statutAppel = this.dossierInf.statutAppel;
    this.statusPrecontentieuse = this.dossierInf.statusPrecontentieuse;
    this.statusAmiable = this.dossierInf.statusAmiable;
    console.log('info dossier',this.dossierInf);
    });
  }

  openSignaler() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '650px',
      height: '370px',
      data:{
        signaler:true,
        valider:false,
        title_label: 'Signaler le dossier',
        sub_title_label: 'Passer à la phase précontentieuse',
        button_label_1: 'Annuler',
        button_label_2: 'OK'
      }
    });
    dialogRef.afterClosed().subscribe(res => {res
      this.dossiers.EnvoyerSignalerDossier( res , this.nomDossier).subscribe({
        complete: () => {
          this.api.OpenSuccessDialog();
          console.log('signaler submitted !!!');
          this.getFolderById();
        },
        error: (e) => {
          console.log(e);
        }})
    })
  }

  openValider() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '650px',
      height: '370px',
      data:{
        signaler:false,
        valider:true,
        title_label: 'Valider le dossier',
        sub_title_label: 'J’ai trouvé un accord avec le débiteur pour le paiement',
        button_label_1: 'Annuler',
        button_label_2: 'OK'
      }
    });
    dialogRef.afterClosed().subscribe(res => {res
      this.dossiers.EnvoyerValidationDossier( res , this.nomDossier).subscribe({
        complete: () => {
          this.api.OpenSuccessDialog();
          console.log('Validation submitted !!!');
          this.getFolderById();
        },
        error: (e) => {
          console.log(e);
        }})
    })
  }

  }





