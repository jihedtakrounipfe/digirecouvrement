import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-demande-specifique',
  templateUrl: './demande-specifique.component.html',
  styleUrls: ['./demande-specifique.component.css']
})
export class DemandeSpecifiqueComponent implements OnInit {
  public displayedColumns = ['select','nom' ];
  constructor() { }

  ngOnInit(): void {
  }
  numbers = new FormControl();
  numbersList: string[] = ['TN59 04 039 0046825899331 23','TN60 33 329 4442225678331 00','TN59 44 023 0046858643101 01','TN59 19 039 0046480099331 54'];

  docs = new FormControl();
  documentsList: string[] = ['Copie de la CIN','Spécimen de signature','Acte de caution','Contrat du prêt',];
}
