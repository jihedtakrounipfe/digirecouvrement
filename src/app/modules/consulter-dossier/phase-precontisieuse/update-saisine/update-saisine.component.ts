import { UploadFileModalComponent } from './../../../../shared/upload-file-modal/upload-file-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { PreviewService } from 'app/services/preview.service';

@Component({
  selector: 'app-update-saisine',
  templateUrl: './update-saisine.component.html',
  styleUrls: ['./update-saisine.component.css']
})

export class UpdateSaisineComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  public reload: string;
  public subscription: Subscription;
  public url: string;
  public file:any;
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

  ngOnInit(): void {
    this.subscription = this.api.saisineTag.subscribe((data: any) => {
      data;
      console.log('selected elements', this.saisine = data, this.nomDossier);

      this.dossiers.getSaisineName(this.nomDossier, this.saisine).subscribe((data) => {
        console.log('saisine by id', this.saisine);
        this.updateForm.setValue({
          nomsaisine:data["nomsaisine"],
          region:data["region"],
          typeDeTiers:data["typeDeTiers"],
          nomDeTiers:data["nomDeTiers"],
        });
      });
    });
  }

  updateForm = new FormGroup({
    nomsaisine: new FormControl("", [Validators.required, Validators.minLength(3)]),
    region: new FormControl("", [Validators.required, Validators.minLength(3)]),
    typeDeTiers: new FormControl("", [Validators.required, Validators.minLength(3)]),
    nomDeTiers: new FormControl("", [Validators.required, Validators.minLength(3)]),
    file: new FormControl(null, [Validators.required]),
  });

  public openModal() {
    const dialogRef = this.dialog.open(UploadFileModalComponent, { data: { name: this.nomDossier }, width: '600px', height: '350px', disableClose: true });
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        this.file = submit;
        this.updateForm.patchValue({ file: this.file }); // Set the 'file' value here
        console.log('File selected:', this.file);
      } else {
        this.file = 'Nothing...';
      }
    });
  }

  public save() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Es-tu sûr?')) {
        const formData = new FormData();
        formData.append('nomsaisine', this.updateForm.value.nomsaisine);
        formData.append('region', this.updateForm.value.region);
        formData.append('typeDeTiers', this.updateForm.value.typeDeTiers);
        formData.append('nomDeTiers', this.updateForm.value.nomDeTiers);
        formData.append('file', this.updateForm.value.file);

        this.dossiers.updateSaisine(formData, this.nomDossier, this.saisine).subscribe({
          complete: () => {
            this.OpenSuccessDialog();
            this.reloadData.emit(this.reload);
            console.log('Content updated successfully!');
          },
          error: (e) => {
            this.api.OpenEchecDialog();
            console.log(e);
          },
        });
      }
    }
  }

  public OpenSuccessDialog() {
    this.dialog.open(SuccessMessageComponent, {
      width: '600px',
      height: '300px',
      data: {
        title_label: 'Succès',
        sub_title_label: 'Saisine a été Modifié avec succès',
        button_label: 'Ok',
        success_icon: true,
        echec_icon: false,
      },
    });
  }

  /*onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Process the selected file here, for example, you can store it in the component property or update the FormData control.
      this.updateForm.patchValue({ formData: file });
    }
  }*/

  Type: string[] = [
    'Ben Arous',
    'Sousse',
    'Gafsa'
  ]
  Autre: string[] = [
    'Avocat',
    'Huissier',
  ]
}
