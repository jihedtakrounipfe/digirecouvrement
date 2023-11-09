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
  public url: string;
  public file: string;
  public reload: string;
  submitted = false;
  param: number;
  saisine: string;
  public nomDossier = this.route.snapshot.params.nomDossier;
  public FormData: FormData = new FormData();

  constructor(
    private api: PreviewService,
    private dossiers: ListDossiersService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

    New_Saisine_Form = new FormGroup({
      nomsaisine: new FormControl('', [Validators.required, Validators.minLength(3)]),
      region: new FormControl('', [Validators.required, Validators.minLength(3)]),
      typeDeTiers: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nomDeTiers: new FormControl('', [Validators.required, Validators.minLength(3)]),
      formData: new FormControl(null, [Validators.required]), // Remove the minLength(3) for file field
    });

  public save() {

    this.FormData.append('nomsaisine', this.New_Saisine_Form.value.nomsaisine);
    this.FormData.append('region', this.New_Saisine_Form.value.region);
    this.FormData.append('typeDeTiers', this.New_Saisine_Form.value.typeDeTiers);
    this.FormData.append('nomDeTiers', this.New_Saisine_Form.value.nomDeTiers);
    this.FormData.append('file', this.New_Saisine_Form.get('formData').value);

    this.dossiers.CreateSaisine(this.FormData, this.nomDossier).subscribe({
      complete: () => {
        console.log('Saisine successfully created!');
        this.OpenSuccessDialog();
        this.reloadData.emit(this.reload);
      },
      error: (e) => {
        console.log(e.message);
        this.api.OpenEchecDialog();
      },
    });
  }

  public OpenSuccessDialog() {
    this.dialog.open(SuccessMessageComponent, {
      width: '600px',
      height: '300px',
      data: {
        title_label: 'Succès',
        sub_title_label: 'Saisine a été ajouté avec succès',
        button_label: 'Ok',
        success_icon: true,
        echec_icon: false,
      },
    });
  }

  // public onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   this.New_Saisine_Form.patchValue({ formData: file });
  // }

  public openModal() {
    const dialogRef =
    this.dialog.open(UploadFileModalComponent,
      {
      data: {name: "upload File"},
      width:'700px',
      height:'480px',
      disableClose: true
      });
    dialogRef.afterClosed().subscribe((Myfile) => {
      console.log(Myfile,'after close popup file')
      this.FormData = Myfile
  })
  }


  Type: string[] = ['Ben Arous', 'Sousse', 'Gafsa'];
  Autre: string[] = ['Avocat', 'Huissier'];
}
