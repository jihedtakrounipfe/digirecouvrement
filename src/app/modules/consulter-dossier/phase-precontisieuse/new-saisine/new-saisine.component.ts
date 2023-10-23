import { UploadFileModalComponent } from './../../../../shared/upload-file-modal/upload-file-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { PreviewService } from 'app/services/preview.service';


@Component({
  selector: 'app-new-saisine',
  templateUrl: './new-saisine.component.html',
  styleUrls: ['./new-saisine.component.css']
})
export class NewSaisineComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  public url:string;
  public file:string;
  public reload:string;
  public nomDossier = this.route.snapshot.params.nomDossier;
  constructor(
    private api:PreviewService,
    private dossiers: ListDossiersService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
  }
  New_Saisine_Form = new FormGroup({
    nomsaisine: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    region: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    typeDeTiers: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    nomDeTiers: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    piecejointe: new FormControl("", [ Validators.required, Validators.minLength(3) ]),

  });

  public save() {
    this.dossiers.CreateSaisine(this. New_Saisine_Form.value,this.nomDossier).subscribe({
      complete: () => {
        console.log('Echeancier successfully created!');
        this.OpenSuccessDialog();
        this.reloadData.emit(this.reload);
      },
      error: (e) => {
        console.log(e);
        this.api.OpenEchecDialog();
      },
    });

  }
  public OpenSuccessDialog() {
    this.dialog.open(SuccessMessageComponent, {
      width: '600px',
      height: '300px',
      data:{
        title_label: 'Succès',
        sub_title_label: 'Saisine a été ajouté avec succès',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
    });
  }

  public openModal() {
      const dialogRef =  this.dialog.open(UploadFileModalComponent, {data: {name: this.nomDossier} ,width:'600px' ,height:'350px', disableClose: true});
      dialogRef.afterClosed().subscribe((submit) => {
        if (submit) {
          this.file = submit;
          this.New_Saisine_Form.value.piecejointe =this.file
          console.log('file subscription',this.New_Saisine_Form.value.piecejointe);
        } else {
          this.file = 'Nothing...';
        }
    })
  }

    Type:string[] = [
      'Ben Arous',
      'Sousse',
      'Gafsa'
    ]
    Autre:string[] = [
      'Avocat',
      'Huissier',
    ]
}

