
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { PreviewService } from 'app/services/preview.service';


@Component({
  selector: 'app-new-detail-frais',
  templateUrl: './new-detail-frais.component.html',
  styleUrls: ['./new-detail-frais.component.css']
})
export class NewDetailFraisComponent implements OnInit {

@Output() reloadData = new EventEmitter();
public reload:string;
public nomDossier = this.route.snapshot.params.nomDossier;
  constructor(
    private dossiers: ListDossiersService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private api:PreviewService
  ) { }


  ngOnInit(): void {}
    New_Detail_Form = new FormGroup({
    nom: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    prenom: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    typedeTiers: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    facturation: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    paiment: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
    typedeSaisine: new FormControl("", [ Validators.required, Validators.minLength(3) ]),

    });

  public save() {

    console.log('Echeancier form content',this.New_Detail_Form.value,this.nomDossier);
    this.dossiers.CreateDetail(this.New_Detail_Form.value,this.nomDossier).subscribe({
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
          sub_title_label: 'Frais a été ajouté avec succès',
          button_label: 'Ok',
          success_icon:true,
          echec_icon:false
        }
      });
  }
  echeancier:string[] = [ 'Trimestrielle', 'Mensuelle']
}
