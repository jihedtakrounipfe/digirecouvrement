import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-dossiers-financier',
  templateUrl: './list-dossiers-financier.component.html',
  styleUrls: ['./list-dossiers-financier.component.css']
})

export class ListDossiersFinancierComponent implements OnInit {
  displayedColumns = ['nomDossier', 'nom', 'adresse','frais','versement'];
  @ViewChild (MatPaginator) paginator: MatPaginator;
  public nameFolder:string
  public ChargeName:string;
  public selection = new SelectionModel<Element>(true, []);
  public dossier: any;

  constructor(
    private dossiers : ListDossiersService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  this.ChargeName = localStorage.getItem('USER_PROFILE');
  this.getDossiers();
  }
  public getDossiers(){
    this.dossiers.getDossierDirecteurs().subscribe((data:any) => {
      this.dossier = new MatTableDataSource(
        data.dossiers.filter(item => {
          if ( item.statusAmiable !=="Signalé")
           {
            return item
           }
        })
      );
      // this.dossier = new MatTableDataSource(data.dossiers);
      console.log('dossiers Directeurs data',this.dossier)
      this.dossier.paginator = this.paginator;
    });
  }

  public CnsulterFrais(nomDossier:string) {
    this.router.navigate(['/consulter-frais/' + nomDossier]);
  }
  public CnsulterVersements(nomDossier:string) {
    this.router.navigate(['/consulter-versement/' + nomDossier]);
  }

}


