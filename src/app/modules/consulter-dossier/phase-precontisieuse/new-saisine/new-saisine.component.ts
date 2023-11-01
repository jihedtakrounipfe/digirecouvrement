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
  public nomDossier = this.route.snapshot.params.nomDossier;
  submitted = false;
  param: number;
  saisine: string;

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
    const formData = new FormData();

    formData.append('nomsaisine', this.New_Saisine_Form.value.nomsaisine);
    formData.append('region', this.New_Saisine_Form.value.region);
    formData.append('typeDeTiers', this.New_Saisine_Form.value.typeDeTiers);
    formData.append('nomDeTiers', this.New_Saisine_Form.value.nomDeTiers);
    formData.append('file', this.New_Saisine_Form.value.formData);

    this.dossiers.CreateSaisine(formData, this.nomDossier).subscribe({
      complete: () => {
        console.log('Saisine successfully created!');
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
      const dialogRef = this.dialog.open(UploadFileModalComponent, { data: { name: this.nomDossier }, width: '600px', height: '350px', disableClose: true });
      dialogRef.afterClosed().subscribe((submit) => {
        if (submit) {
          const formData = new FormData();
          this.file = submit;
          formData.append('file', this.file);
          this.New_Saisine_Form.patchValue({ formData }); // Set the 'formData' value here
          console.log('File selected:', this.file);
        } else {
          this.file = 'Nothing...';
        }
      });
    }

  Type: string[] = ['Ben Arous', 'Sousse', 'Gafsa'];
  Autre: string[] = ['Avocat', 'Huissier'];
}
