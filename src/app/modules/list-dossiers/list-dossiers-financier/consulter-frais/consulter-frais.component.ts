import { ListDossiersFinancierService } from './../../../../services/list-dossiers-financier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FinancierModalComponent } from 'app/shared/financier-modal/financier-modal.component';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { PreviewService } from 'app/services/preview.service';

@Component({
  selector: 'app-consulter-frais',
  templateUrl: './consulter-frais.component.html',
  styleUrls: ['./consulter-frais.component.css']
})
export class ConsulterFraisComponent implements OnInit {
@ViewChild (MatPaginator) paginator: MatPaginator;
select: string[] = ['Creance 1'];
public displayedColumns: string[] ;
frais:any

public nomDossier = this.route.snapshot.params.nomDossier;
  phase: string;
  montant: any;

constructor(
  private api:PreviewService,
  private financierService :ListDossiersFinancierService,
  private route: ActivatedRoute,
  public dialog: MatDialog,
  private dossiers :ListDossiersService
) { }

ngOnInit(): void {
  this.getdossierByName();
  this.getAllFrais();
};

public openDialog() {
  const dialogRef =
  this.dialog.open(FinancierModalComponent, {
        width: '700px',
        height: '550px',
        data: {
          title_label: 'Ajout des frais',
          sub_title_label: `frais`,
          button_label_1: 'Annuler',
          button_label_2: 'OK',
          versement:false,
          frais:true,
          phase: this.phase
        }
      });
  dialogRef.afterClosed().subscribe(res => {res ;console.log("after close",res)
    this.financierService.CreateFrais( res ,this.nomDossier ).subscribe({
      complete: () => {
        this.api.OpenSuccessDialog();
        console.log(' successfully Added Frais !!!');
        this.getAllFrais();
        this.getdossierByName()
      },
      error: (e) => {
        console.log(e);
      }})
    });
  }

  getdossierByName() {
    this.dossiers.getDossierByName(this.nomDossier).subscribe((data: any) => {
        this.phase = data.phaseAmiable[0].phase;
        this.montant = data.phaseAmiable[0].montantDeCreance;
        console.log('datta', this.phase)
        if(this.phase == "Amiable"){
          this.displayedColumns = ['fraisprecont','naturefrais','tier', 'montants'];
        }
        if(this.phase == "Précontentieuse"){
          this.displayedColumns = ['fraisprecont','naturefrais' , 'typefrais' ,'tier', 'montants','datedeffdesir' ];
        }

    });
  }
  getAllFrais(){
      this.financierService.Getfrais(this.nomDossier).subscribe((data)=>{

        this.frais = new MatTableDataSource(data.fraisprecontentieuse);
        console.log('info frais', this.frais);
        this.frais.paginator = this.paginator;
      })
  }

}
