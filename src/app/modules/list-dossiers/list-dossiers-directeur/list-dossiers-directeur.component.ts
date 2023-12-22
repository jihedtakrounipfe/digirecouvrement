import { MessageRelanceModalComponent } from 'app/shared/message-relance-modal/message-relance-modal.component';
import { Router } from '@angular/router';
import { Component, OnInit, Output, ViewChild,EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { AffecterDossierComponent } from 'app/shared/affecter-dossier/affecter-dossier.component';
import { MatDialog } from '@angular/material/dialog';
import { SignalerDossierComponent } from 'app/shared/signaler-dossier/signaler-dossier.component';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { ConsulterDossierComponent } from 'app/modules/consulter-dossier/consulter-dossier.component';
import { PreviewService } from 'app/services/preview.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ListChargeService } from 'app/services/list-charges.service';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-list-dossiers-directeur',
  templateUrl: './list-dossiers-directeur.component.html',
  styleUrls: ['./list-dossiers-directeur.component.css']
})
export class ListDossiersDirecteurComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter();
  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild('matSort') matSort = new MatSort();
  public selection = new SelectionModel<Element>(true, []);
  public ChargeName:string;
  public DossiersList: ConsulterDossierComponent;
  public displayedColumns:string[];
  public show:boolean = false;
  public ShowAction:boolean ;
  public buttonName:string = 'Filtre';
  public session: string;
  public charges: string;
  public dossier: any;
  public display:string;
  public displayColor:string= "";
  public selectedDevice:string;
  public selectedEtat:string = '';
  public selectedStatus:string = '';
  public selectedDevice_3:string = '';
  public selectedDevice_4:string = '';
  public affecter:boolean;
  public ShowerAffecter: boolean;
  ngAfterViewInit()
  {
    this.dossier.paginator=this.paginator
    this.dossier.sort=this.matSort

  }
  constructor(
    private dossiers : ListDossiersService,
    private api: PreviewService,
    private ChargesApi: ListChargeService,
    public dialog: MatDialog,
    private router: Router,
  ) {}
  public disableSelect = new FormControl(false);

  ngOnInit(): void {
  this.ChargeName = localStorage.getItem('USER_PROFILE');
  this.getDossiers();
  this.getListCharges();
  }

  public getDossiers(){
    this.api.castTag.subscribe(data=>{ this.session = data
      if(this.session =="GROUP_CHARGES"){
        this.dossiers.getDossierCharges(this.ChargeName).subscribe((data:any) => {
          this.dossier = new MatTableDataSource(data.dossiers);
          this.displayedColumns = ['select','nomDossier', 'nom', 'adresse', 'montant','etat','status','phase','created','modified','consulter'];
          this.dossier.paginator = this.paginator;
        });
      }

      if(this.session =="GROUP_DIRECTEURS"){
        this.dossiers.getDossierDirecteurs().subscribe((data:any) => {
          console.log('montant',data.dossiers[0].montant<1000)
          this.dossier = new MatTableDataSource(data.dossiers);
          this.displayedColumns = ['selected','nomDossier', 'nom', 'adresse','region','montant','etat','status','phase','created','modified','agent','consulter','affecter','action'];
          this.dossier.paginator = this.paginator;
        });
      }
    })
  }

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dossier.data.length;
  return numSelected === numRows;
}

masterToggle() {
  if (this.isSomeSelected()) {
    this.selection.clear();
  } else {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dossier.data.forEach(row => this.selection.select(row.nomDossier));
  }
}

isSomeSelected() {
  console.log(this.selection.selected);
  if (this.selection.selected.length > 1 && this.session =="GROUP_DIRECTEURS"){
     this.ShowAction = false;
     this.ShowerAffecter= true;
  }
  if (this.selection.selected.length > 1 && this.session =="GROUP_CHARGES"){
    this.ShowAction = true;
    this.ShowerAffecter= false;
 }
  if(this.selection.selected.length < 1 || this.selection.selected.length == 1 || this.selection.selected.length == 0){
     this.ShowAction = false;
     this.ShowerAffecter= false;
  }

  console.log(this.selection.selected,'selection length');
  return this.selection.selected.length > 0;
}

  public openDialogAffecter(selectedFolder: string) {
    console.log("event", selectedFolder)


    const dialogRef = this.dialog.open(AffecterDossierComponent, {
      width: '600px',
      height: '400px',
      data: {
        selectedFolder: selectedFolder,
        title_label: 'Affecter dossier',
        sub_title_label: `Réaffecter dossier`,
        button_label_1: 'Annuler',
        button_label_2: 'OK',
        affecter_Display: true,
        reaffecter_Display: false
      }
    });
dialogRef.afterClosed().subscribe(res => {res ;console.log("after close",res, selectedFolder)
     this.dossiers.AffecterDossier( res ,selectedFolder ).subscribe({
     complete: () => {
      console.log(' successfully Affecté !!!');
      this.getDossiers();
      },
     error: (e) => {
      console.log(e);
     }})
  });
}

public openReaffecterDialog(selectedFolder:string) {
  console.log("event", selectedFolder)
  const dialogRef = this.dialog.open(AffecterDossierComponent, {
        width: '600px',
        //height: '500px',
        data: {
          selectedFolder: selectedFolder,
          title_label: 'Réaffecter  dossier',
          sub_title_label: `Réaffecter dossier`,
          button_label_1: 'Annuler',
          button_label_2: 'OK',
          affecter_Display:false,
          reaffecter_Display:true
        }
      });
  dialogRef.afterClosed().subscribe(agent => {agent ;console.log("after close",agent)
    let dossier = selectedFolder['nomDossier'];
    this.dossiers.ReaffecterDossier( agent , dossier ).subscribe({
      complete: () => {
        console.log('successfully Réaffecté !!!');
        this.dossiers.getDossierDirecteurs().subscribe((data:any) => {
          this.dossier = new MatTableDataSource(data.dossiers);
          console.log('dossiers Directeurs data',this.dossier)
          this.dossier.paginator = this.paginator;
        });
      },
      error: (e) => {
        console.log(e);
      }})
  });
}

public  openDialogSignaler(selectedFolder:string){
console.log("event", selectedFolder)
const dialogRef = this.dialog.open(SignalerDossierComponent, {
      width: '600px',
      height: '350px',
      data: selectedFolder
    });
dialogRef.afterClosed().subscribe(res => {res ;console.log("after close",res,selectedFolder)
  this.dossiers.SignalerDossier( res ,selectedFolder).subscribe({
    complete: () => {
      console.log('successfully Signalé !!!');
      this.getDossiers();
    },
    error: (e) => {
      console.log(e);
    }})
  });
}

public reset(reset){
  reset = this.getDossiers();
  this.selectedStatus =null
  this.selection.selected.length=0
}

public Filtertoggle(){
    this.show = !this.show;
    if(this.show)
      this.buttonName = "Fermer Filter";
    else
      this.buttonName = " Filter";
  }

public CnsulterAction(nomDossier:string) {
  console.log(nomDossier,'set folder name')
  this.router.navigate(['/consulter-dossier/' + nomDossier]);
}

applyFilter(filterValue: string) {
    console.log('filter value',filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dossier.filter = filterValue;
}
onChange() {
    console.log(this.selectedDevice);
    this.selectedDevice = this.selectedDevice.trim(); // Remove whitespace
    this.selectedDevice = this.selectedDevice.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dossier.filter = this.selectedDevice;
}
onChangeEtat() {
    console.log(this.selectedEtat);
    this.selectedEtat = this.selectedEtat.trim(); // Remove whitespace
    this.selectedEtat = this.selectedEtat.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dossier.filter = this.selectedEtat;
}
onChangeStatus() {
    console.log(this.selectedStatus);
    if(this.session =="GROUP_CHARGES"){
      this.dossiers.getDossierCharges(this.ChargeName).subscribe((data:any) => {
        this.dossier = new MatTableDataSource(data.dossiers.filter((a: any) => {
          if (a.statusAmiable == this.selectedStatus) {
            console.log('filtred', a)
            return a;
          }
        }));
        this.dossier.paginator = this.paginator;
      });
    }
    if(this.session =="GROUP_DIRECTEURS"){
      this.dossiers.getDossierDirecteurs().subscribe((data:any) => {
        this.dossier = new MatTableDataSource(data.dossiers.filter((a: any) => {
          console.log('status',a.statusAmiable)
          if (a.statusAmiable == this.selectedStatus) {
            console.log('filtred', a)
            return a;
          }}));
      });
    }
}
onChangeMontant() {
  console.log(this.selectedDevice_3);
  this.selectedDevice_3 = this.selectedDevice_3.trim(); // Remove whitespace
  this.selectedDevice_3 = this.selectedDevice_3.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dossier.filter = this.selectedDevice_3;
}

onChangeRegion() {
  console.log(this.selectedDevice_4);
  this.selectedDevice_4 = this.selectedDevice_4.trim(); // Remove whitespace
  this.selectedDevice_4 = this.selectedDevice_4.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dossier.filter = this.selectedDevice_4;
}

public filter_montant(min:number,max:number) {
  if (this.session == "GROUP_DIRECTEURS") {
    this.dossiers.getDossierDirecteurs().subscribe((data) => {
      this.dossier = new MatTableDataSource(data['dossiers'].filter((a: any) => {
        if ((min <= a.montant) && (a.montant <= max)) {
          return a;
        }
      }));
      this.dossier.paginator = this.paginator;
    })
  } else if (this.session == "GROUP_CHARGES") {
    this.dossiers.getDossierCharges(this.ChargeName).subscribe((data) => {
      this.dossier = new MatTableDataSource(data['dossiers'].filter((a: any) => {
        if ((min <= a.montant) && (a.montant <= max)) {
          return a;
        }
      }));
      this.dossier.paginator = this.paginator;
    })
  }

}

  montant = ['100000','15000','1000'];
  status = ['En cours','À Faire','Traité','Signalé','Affecté','Non affecté']
  charge = ['Falih Abdul','Faycel Tounsi','brahim salim','Najah Mrabet','Walid Chebbi']
  phase = ['Amiable','Judiciaire','Précontentieuse']
  etat = ['Complet','Incomplet']
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
  public openModal(){
    const dialogRef =  this.dialog.open(MessageRelanceModalComponent, {
      width: '600px',
      height: '430px',
      data:{
        selectedFolders:this.selection.selected,
        title_label: 'Message',
        sub_title_label_1: 'Liste de dossiers sélectionnés',
        sub_title_label_2: 'Message ',
        button_label_1: 'Annuler',
        button_label_2: 'Ok',
        Reclamation:false,
        sms:false,
        appel:false,
        multi_message:true,
        paymentform:false
      }
    });
    dialogRef.afterClosed().subscribe(res => {res ;console.log("after close relance Message En Masse",res)
    this.dossiers.relanceMessageEnMasse( res).subscribe({
      complete: () => {
        console.log('successfully passed !!!');
        this.ReturnSelectedElementsCharges();
      },
      error: (e) => {
        console.log(e);
      }})
    });
  }
  public openMultiAffectation() {
    const dialogRef = this.dialog.open(AffecterDossierComponent, {
      width: '600px',
      height: '490px',
      data: {
        selectedFolder: this.selection.selected,
        title_label: 'Affecter dossier',
        sub_title_label: `Réaffecter dossier`,
        sub_title_label_1: 'Liste de dossiers sélectionnés',
        button_label_1: 'Annuler',
        button_label_2: 'OK',
        affecter_Display: false,
        reaffecter_Display: false,
        multi_affecter: true,
      }
    });
dialogRef.afterClosed().subscribe(res => {res ;console.log("after close",res.dossiers)
  this.dossiers.AffecterDossierParLot( res ).subscribe({
     complete: () => {
      console.log(' successfully Affecté !!!');
      this.ReturnSelectedElementsDirecteurs();
    },
     error: (e) => {
      console.log(e);
     }})
  });
}
ReturnSelectedElementsDirecteurs(){
  this.dossiers.getDossierDirecteurs().subscribe((data:any) => {
    this.dossier = new MatTableDataSource(data.dossiers);
    this.dossier.filterPredicate = (exist: any) => {
      return this.selection.selected?.length > 0
         ? this.selection.selected.some(selection => selection == exist.nomDossier)
         : true;
      }
      this.dossier.filter = 'only used to trigger filter';
      if (this.dossier.paginator) {
         this.dossier.paginator.firstPage();
      }
    });
}
ReturnSelectedElementsCharges(){
  this.dossiers.getDossierCharges(this.ChargeName).subscribe((data:any) => {
    this.dossier = new MatTableDataSource(data.dossiers);
    this.dossier.filterPredicate = (exist: any) => {
      return this.selection.selected?.length > 0
         ? this.selection.selected.some(selection => selection == exist.nomDossier)
         : true;
      }
      this.dossier.filter = 'only used to trigger filter';
      if (this.dossier.paginator) {
         this.dossier.paginator.firstPage();
      }
    });
}
getListCharges() {
    this.ChargesApi.getAllCharge().subscribe((data: any) => {
      console.log("list", data);
      this.charges = data.charges.filter(item => {
          if (item.enabled == "true") {
            return item
          }
        })
    });
  }
  phases = {
    items: [
      {
        data: [
          { text: 'Amiable', value: 1 },
          { text: 'Précontentieuse', value: 2 },
          { text: 'Judiciaire', value: 3 }
        ],
      },
    ],
  };

  ListPhases = this.phases.items[0];
  selectedPhaseNumber:number;
  selectedPhaseValue:string;
  public filter_phase() {
   console.log(this.selectedPhaseNumber);
    if(this.selectedPhaseNumber == 1){this.selectedPhaseValue ='Amiable'}
    else if(this.selectedPhaseNumber == 2){this.selectedPhaseValue ='Précontentieuse'}
    else if(this.selectedPhaseNumber == 3){this.selectedPhaseValue ='Judiciaire'}
    console.log(this.selectedPhaseValue);
    if (this.session == "GROUP_DIRECTEURS") {
      this.dossiers.getDossierDirecteurs().subscribe((data) => {
        this.dossier = new MatTableDataSource(data['dossiers'].filter((a: any) => {
          console.log('taskslist', a.phase);
          if (this.selectedPhaseValue == a.phase) {
            console.log('filtred', a)
            return a;
          }
        }));
        this.dossier.paginator = this.paginator;
      })
    } else if (this.session == "GROUP_CHARGES") {
      this.dossiers.getDossierCharges(this.ChargeName).subscribe((data) => {
        this.dossier = new MatTableDataSource(data['dossiers'].filter((a: any) => {
          console.log('taskslist', a.phase);
          if (this.selectedPhaseValue == a.phase) {
            console.log('filtred', a)
            return a;
          }
        }));
        this.dossier.paginator = this.paginator;
      })
    }

  }
}




