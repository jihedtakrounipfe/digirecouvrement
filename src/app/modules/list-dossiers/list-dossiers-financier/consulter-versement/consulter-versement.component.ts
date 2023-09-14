import { PreviewService } from 'app/services/preview.service';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ListDossiersFinancierService } from 'app/services/list-dossiers-financier.service';
import { FinancierModalComponent } from 'app/shared/financier-modal/financier-modal.component';
import { UploadFileModalComponent } from 'app/shared/upload-file-modal/upload-file-modal.component';
import { environment } from './../../../../../environments/environment';
import { AuthenticationService } from '@alfresco/adf-core';

@Component({
  selector: 'app-consulter-versement',
  templateUrl: './consulter-versement.component.html',
  styleUrls: ['./consulter-versement.component.css'],

})
export class ConsulterVersementComponent implements OnInit {
  @ViewChild (MatPaginator) paginator: MatPaginator;
  select: string[] = ['Créance 1'];
  displayedColumns = ['nomVersement' , 'dateVersement' ,'montantVersement', 'modeReglement','typedeversement' , 'affectaion','telecharger'];
  public versement:any;
  public nomDossier = this.route.snapshot.params.nomDossier;
  public minDate: Date;
  public montant:string;
  public phase: string;
  public baseUrl=`${environment.baseUrl}`
  public ticket=`?alf_ticket=${this.authService.getTicketEcm()}`
  constructor(
    private api:PreviewService,
    private financierService :ListDossiersFinancierService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private dossiers :ListDossiersService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getAllVersements()
    this.getVersement();
  };

  public openDialog() {
    const dialogRef =
    this.dialog.open(FinancierModalComponent, {
          width: '700px',
          height: '530px',
          data: {
            title_label: 'Ajout des versements',
            sub_title_label: `versements`,
            button_label_1: 'Annuler',
            button_label_2: 'OK',
            versement:true,
            frais:false,
          }
        });
    dialogRef.afterClosed().subscribe(res => {res ;console.log("after close",res,this.nomDossier)
      this.financierService.CreateVersement(res , this.nomDossier ).subscribe({
        complete: () => {
          this.api.OpenSuccessDialog();
          console.log(' successfully Added versements !!!');
          this.reload()
          this.getVersement()
        },
        error: (e) => {
          console.log(e);
        }})
      });
    }
    reload(){
      setTimeout(()=> {this.getVersement();
        console.log('rfresh 1')},5000);
      setTimeout(()=> {this.getVersement();
        console.log('rfresh 2')},10000);
      setTimeout(()=> {this.getVersement();
        console.log('rfresh 3')},12000);
      setTimeout(()=> {this.getVersement();
        console.log('rfresh 4')},14000);
    }
  getAllVersements() {
    this.dossiers.getDossierByName(this.nomDossier).subscribe((data: any) => {
      this.montant = data.phaseAmiable[0].montantDeCreance;

    });
  }
  getVersement(){
    this.financierService.GetVersement(this.nomDossier).subscribe((data)=>{
      this.versement = new MatTableDataSource(data.Versement);
      this.versement.paginator = this.paginator;
    })
  }

  }




