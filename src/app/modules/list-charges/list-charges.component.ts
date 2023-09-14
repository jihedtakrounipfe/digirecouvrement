import { PreviewService } from './../../services/preview.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild ,EventEmitter, Output} from '@angular/core';
import { PeopleContentService } from '@alfresco/adf-core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import * as _moment from 'moment';
import { ListChargeService } from 'app/services/list-charges.service';
import { SupprimerConsulterChargeModalComponent } from 'app/shared/supprimer-consulter-charge-modal/supprimer-consulter-charge-modal.component';

@Component({
  selector: 'app-list-charges',
  templateUrl: './list-charges.component.html',
  styleUrls: ['./list-charges.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ListChargesComponent implements OnInit {
  @Output() FiltredListCharges = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedTabColumns: string[] = ['select', 'id', 'firstName', 'adresse', 'telephone', 'gouvernorat', 'ville', 'disponibilite','motif', 'dateDeLaProchaineDisponibilite','modifier'];
  public charges: any
  public selection = new SelectionModel<Element>(true, []);
  public selectionMode = 'single';
  dataEntry :any;
  oldCharge:string;
  newCharge:string;
  constructor(private api: PreviewService ,private dialog: MatDialog, private ChargeApi: ListChargeService, private peopleService: PeopleContentService) { }


  ngOnInit(): void {
    //this.people();
    this.listAllCharge();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.charges.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {

  // if there is a selection then clear that selection
    if (this.isSomeSelected()) {
      this.selection.clear();

    } else {
      this.isAllSelected()
        ? this.selection.clear()
        : this.charges.data.forEach(row => this.selection.select(row));
    }
  }

  public isSomeSelected() {
    console.log(this.selection.selected);
    return this.selection.selected.length > 0;
  }

  listAllCharge() {
    this.ChargeApi.getAllCharge().subscribe((data: any) => { console.log("nouv-chargés", data);
      this.charges = new MatTableDataSource(
        data.charges.filter(item => {
          if (item.enabled == "true") {
            return item
          }
        })
      );
      // console.log('chergers',this.charges.filteredData[0]['dateDeLaProchaineDisponibilite']);
	    this.ChargeApi.SetTag(this.charges);
      this.FiltredListCharges.emit(this.charges);
      this.charges.paginator = this.paginator;
    });
  }

  public openRemplacerDialog() {
    console.log(this.selection.selected)
    const dialogRef = this.dialog.open(SupprimerConsulterChargeModalComponent, {
      width: '550px',
      data: {
        numSelected: this.selection.selected,
        title_label: 'Remplacer ce chargé',
        sub_title_label: `Voulez-vous remplacer le(s) chargé(s)`,
        button_label_1: 'Annuler',
        button_label_2: 'OK',
        Supprimer_Display:false,
        Remplacer_Display:true,
        ShoWOldcharge:true
      }
    });

    dialogRef.afterClosed().subscribe(res => {res ;console.log('subscription',res);
    this.oldCharge = res[0].oldCharge;
    this.newCharge = res[1].newCharge;
    console.log(this.oldCharge,'old');
    console.log(this.newCharge,'new');

    this.ChargeApi.RemplacerCharge( this.oldCharge , this.newCharge ).subscribe({
        complete: () => {
          console.log('Chergé successfully replaced!');
          console.log('Replaced',res);
          this.listAllCharge();
          this.api.OpenSuccessDialog();
        },
        error: (e) => {
            console.log(e);
          },
        })
      });
  }

  public openDeleteDialog() {
    console.log(this.selection.selected)
    const dialogRef = this.dialog.open(SupprimerConsulterChargeModalComponent, {
      width: '550px',
      height: '350px',
      data: {
        numSelected: this.selection.selected,
        title_label: 'Supprimer ce chargé',
        sub_title_label: `Voulez-vous supprimer ce chargé ?`,
        button_label_1: 'Annuler',
        button_label_2: 'OK',
        Supprimer_Display:true,
        Remplacer_Display:false,
      }
    });
    dialogRef.afterClosed().subscribe(res => {res ;console.log('subscription',res);
      const data = {"enabled": false}
      this.ChargeApi.updateCharge( res , data).subscribe({
        complete: () => {
          console.log('Chergé successfully removed!');
          console.log('delited',res);
          this.listAllCharge();
          this.api.OpenSuccessDialog();
        },
        error: (e) => {
          console.log(e);
        },
      })
    })
  }
}

