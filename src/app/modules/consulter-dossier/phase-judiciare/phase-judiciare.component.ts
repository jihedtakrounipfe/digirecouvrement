import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { PreviewService } from 'app/services/preview.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-phase-judiciare',
  templateUrl: './phase-judiciare.component.html',
  styleUrls: ['./phase-judiciare.component.css']
})
export class PhaseJudiciareComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter();
  @ViewChild (MatPaginator) paginator: MatPaginator;
  public displayedTabColumns: string[] = ['select','nom','prenom', 'typeDeTiers','facturation','paiment','typedesaisine'];
  public nomDossier = this.route.snapshot.params.nomDossier;
  public session: string;
  public DetailsFrais:any;
  public subscription:Subscription;
  public list:boolean = true;
  public add:boolean = false;
  public updateForm:boolean = false;
  constructor(private dossiers : ListDossiersService, private api: PreviewService ,private route: ActivatedRoute) {  }

  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription =this.api.castTag.subscribe(data=>{ this.session = data})
    //subscriptions by folder informations
    this.getFrais();
  }
  getFrais(){
    this.dossiers.getDossierByName(this.nomDossier).subscribe((data:any) =>{
      this.DetailsFrais =  new MatTableDataSource(data.phasejudiciare);
        console.log('info dossier Details Frais',this.DetailsFrais);
      this.DetailsFrais.paginator = this.paginator;
    });
  }
  Reload(event){
    event = this.getFrais();
    this.show();
  }
  selectFrais(Selected){
    console.log('Selected ech',Selected)
     this.api.SetSelctedFraisJdc(Selected);
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
}
