import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { PreviewService } from 'app/services/preview.service';
import { HttpClient } from '@angular/common/http';
import { UploadFileModalComponent } from 'app/shared/upload-file-modal/upload-file-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-saisine',
  templateUrl: './update-saisine.component.html',
  styleUrls: ['./update-saisine.component.css'],
})
export class UpdateSaisineComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  public reload: string;
  public subscription: Subscription;
  public url: string;
  public file: File | null = null; // Updated to accept a File
  public nomDossier = this.route.snapshot.params.nomDossier;
  submitted = false;
  param: number;
  saisine: string;

  constructor(
    private api: PreviewService,
    private dossiers: ListDossiersService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.subscription = this.api.saisineTag.subscribe((data: any) => {
      data;
      console.log('selected elements', (this.saisine = data), this.nomDossier);

      this.dossiers.getSaisineName(this.nomDossier, this.saisine).subscribe((data) => {
        console.log('saisine by id', this.saisine);
        this.updateForm.setValue({
          nomsaisine: data['nomsaisine'],
          region: data['region'],
          typeDeTiers: data['typeDeTiers'],
          nomDeTiers: data['nomDeTiers'],
          formData: this.file,
        });
      });
    });
  }

  updateForm = new FormGroup({
    nomsaisine: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    typeDeTiers: new FormControl('', [Validators.required]),
    nomDeTiers: new FormControl('', [Validators.required]),
    formData: new FormControl(''), // This field is for the file
  });

  // Update the save function to handle file uploads with FormData
  save() {
    this.submitted = true;
    if (!this.updateForm.valid) {
      return false;
    } else {
      if (window.confirm('Es-tu sûr?')) {
        const formData = new FormData();
        formData.append('nomsaisine', this.updateForm.get('nomsaisine')!.value);
        formData.append('region', this.updateForm.get('region')!.value);
        formData.append('typeDeTiers', this.updateForm.get('typeDeTiers')!.value);
        formData.append('nomDeTiers', this.updateForm.get('nomDeTiers')!.value);
        formData.append('formData', this.file!); // Append the file

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

  // Handle file selection
  onFileSelected(event: any) {
    this.file = event.target.files[0];
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

  public openModal() {
    const dialogRef = this.dialog.open(UploadFileModalComponent, {
      data: { name: this.nomDossier },
      width: '600px',
      height: '350px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        this.file = submit;
      }
    });
  }

  Type: string[] = ['Ben Arous', 'Sousse', 'Gafsa'];
  Autre: string[] = ['Avocat', 'Huissier'];
}
