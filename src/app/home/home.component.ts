import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Component, Input, ViewChild, OnInit, NgZone } from '@angular/core';
import {
  AuthenticationService,
} from '@alfresco/adf-core';
import { PreviewService } from 'app/services/preview.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment-es6';
import * as _moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class HomeComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[];

  // public dataSource = new MatTableDataSource(ELEMENT_DATA);
  public selectionMode = 'single';
  public buttonName: any = 'Filtre';
  public show: boolean = false;
  public IsCharge: boolean = false;
  public IsAdmin: boolean = true;
  public multiselect = false;
  public stickyHeader = false;
  public selection = new SelectionModel<Element>(true, []);
  public subscription: Subscription;
  public session: string;
  public titre: string;
  public filter_label: string;
  public chart1: string;
  public tache: string;
  public user_name: string;
  public debiteur:any;
  public selectedDevice: string = '';
  public tasks: any;
  public minDate: Date;
  montant_filter: any;
  public charges: any;
  constructor(
    private authService: AuthenticationService,
    private api: PreviewService) {

    const currentYear = new Date().getFullYear();
    const currentmonth = new Date().getMonth();
    const currentDay = new Date().getDay();

    console.log('date', currentYear, currentmonth, currentDay)
    this.minDate = new Date(currentYear, currentmonth - 1, currentDay);
    console.log('mindate', this.minDate)
  }
  ngOnInit(): void {
    console.log('ticket', this.authService.getTicketEcm())
    //subscriptions by BehaviorSubject
    this.subscription = this.api.castTag.subscribe(data => {
      this.session = data;
      if (this.session == "GROUP_CHARGES") {
        this.chart1 = "Variation des recouvrements"
        this.tache = "Mes tâches"
        this.filter_label = "Débiteur"
        this.titre = "Dashboard Chargé";

        this.user_name = localStorage.getItem('USER_PROFILE');
        this.api.listetaches(this.user_name).subscribe((data) => {
          this.tasks = new MatTableDataSource(data['dossiers']);
          this.tasks.paginator = this.paginator;
          this.debiteur = data['dossiers'];
          console.log('taskslistchargee', this.tasks);
          this.displayedColumns = ['numero','nom','phase','montant','tache','note','chat','phone','consulter'];
        })
      }
      else if (this.session == "GROUP_DIRECTEURS") {
        this.chart1 = "Variation des recouvrements par chargé"
        this.tache = "Tâches des chargés"
        this.titre = "Dashboard Directeur";
        this.filter_label = "Chargé"
        this.api.listetaches("").subscribe((data) => {
          this.tasks = new MatTableDataSource(data['dossiers']);
          this.tasks.paginator = this.paginator;
          this.charges = data['dossiers']
          console.log('taskslist', this.tasks);
          this.displayedColumns = ['nomCharge', 'numero','nom','phase','montant','tache'];
        })
      }
      else return this.titre = "Dashboard Financier";
    });
  }

  public toggle() {
    this.show = !this.show;
    if (this.show)
      this.buttonName = "Fermer Filter";
    else
      this.buttonName = " Filter";
  }

  applyFilter(filterValue: string) {
    console.log('filter value', filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.tasks.filter = filterValue;
  }
  onChange() {
    console.log(this.selectedDevice);
    this.selectedDevice = this.selectedDevice.trim(); // Remove whitespace
    this.selectedDevice = this.selectedDevice.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.tasks.filter = this.selectedDevice;
    console.log(this.tasks.filter, 'filtred tasks')
  }
  
  /* public filter_montant() {
    console.log(this.selectedDevice);
    console.log('number', Number("10 000"))
    this.selectedDevice = this.selectedDevice.trim(); // Remove whitespace
    this.selectedDevice = this.selectedDevice.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    console.log(this.tasks.filteredData);
    if (this.selectedDevice == '0 - 10 000') {
      this.api.listetaches("").subscribe((data) => {
        this.tasks = new MatTableDataSource(data['dossiers'].filter((a: any) => {
          if (0 <= a.montant && a.montant <= 10000) {
            console.log('filtred', a)
            return a;
          }
        }));
        this.tasks.paginator = this.paginator;
        console.log('taskslist', this.tasks);

      })
    } else if (this.selectedDevice == '10 000 - 100 000') {
      this.api.listetaches("").subscribe((data) => {
        this.tasks = new MatTableDataSource(data['dossiers'].filter((a: any) => {
          if ('10 000' <= a.montant && a.montant <= '100 000') {
            console.log('filtred', a)
            return a;
          }
        }));
        this.tasks.paginator = this.paginator;
        console.log('taskslist', this.tasks);

      })
    }

  } */


  filterDate = new FormGroup({
    date: new FormControl("", [Validators.required]),
  });
  public reset(reset) { reset = this.ngOnInit(); }

  relance = ['Message', 'Appel téléphonique', 'Réclamation']
  charge = ['Falih Abdul', 'Faycel Tounsi', 'Najah Mrabet', 'Walid Chebbi', 'Mohsen Bjaoui']
  montant = ['0 - 10 000', '10 000 - 100 000', '100 000 - 500 000', '500 000 - 1 000 000']
  cpi = ['charge 1', 'charge 2', 'charge 3']
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
      this.api.listetaches("").subscribe((data) => {
        this.tasks = new MatTableDataSource(data['dossiers'].filter((a: any) => {
          console.log('taskslist', a.phase);
          if (this.selectedPhaseValue == a.phase) {
            console.log('filtred', a)
            return a;
          }
        }));
        this.tasks.paginator = this.paginator;
        console.log('taskslist', data['dossiers']);
        console.log('session', this.session)

      })
    } else if (this.session == "GROUP_CHARGES") {
      this.api.listetaches("").subscribe((data) => {
        this.tasks = new MatTableDataSource(data['dossiers'].filter((a: any) => {
          console.log('taskslist', a.phase);
          if (this.selectedPhaseValue == a.phase) {
            console.log('filtred', a)
            return a;
          }
        }));
        this.tasks.paginator = this.paginator;
        console.log('taskslist', data['dossiers']);
        console.log('session', this.session)

      })
    }

  }
}

