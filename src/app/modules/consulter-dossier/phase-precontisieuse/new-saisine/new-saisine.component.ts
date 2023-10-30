import { Component, OnInit, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListDossiersService } from 'app/services/list-dossiers.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { PreviewService } from 'app/services/preview.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'; // Add HttpClient
import { Router } from '@angular/router';
import { UploadFileModalComponent } from 'app/shared/upload-file-modal/upload-file-modal.component';

@Component({
  selector: 'app-new-saisine',
  templateUrl: './new-saisine.component.html',
  styleUrls: ['./new-saisine.component.css'],
})
export class NewSaisineComponent implements OnInit {
  public title_label: string = '';
  public sub_title_label: string = '';
  public button_label_1: string = '';
  public button_label_2: string = '';
  public phase: string;
  public saisine: boolean;
  public error: boolean;
  public erreur: string;
  public frais: Boolean;
  public minDate: Date;
  public FormData: FormData = new FormData(); // Initialize FormData
  submitted: boolean;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public SaisineModal: MatDialogRef<NewSaisineComponent>,
    private http: HttpClient // Add HttpClient
  ) {}

  ngOnInit(): void {
    this.title_label = this.data.title_label;
    this.button_label_1 = this.data.button_label_1;
    this.button_label_2 = this.data.button_label_2;
    this.saisine = this.data.saisine;
    this.phase = this.data.phase;
    console.log(this.saisine);
    console.log(this.phase);
  }

  Saisine_Form = new FormGroup({
    nomsaisine: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    typeDeTiers: new FormControl('', [Validators.required]),
    nomDeTiers: new FormControl('', [Validators.required]),
    formData: new FormControl(null, [Validators.required]), // This field is for the file
  });

  colsePopup() {
    this.SaisineModal.close();
  }

  OnSubmitSaisine() {
    this.submitted = true;
    if (!this.Saisine_Form.valid) {
      return false;
    } else {
      if (window.confirm('Es-tu sûr?')) {
        const formData = new FormData();
        formData.append('nomsaisine', this.Saisine_Form.get('nomsaisine').value);
        formData.append('region', this.Saisine_Form.get('region').value);
        formData.append('typeDeTiers', this.Saisine_Form.get('typeDeTiers').value);
        formData.append('nomDeTiers', this.Saisine_Form.get('nomDeTiers').value);
        formData.append('formData', this.Saisine_Form.get('formData').value);

        // Use HttpClient to post the data to the server
        this.http.post('your_server_endpoint_here', formData).subscribe({
          complete: () => {
            this.OpenSuccessDialog();
            this.SaisineModal.close(); // Close the dialog
            console.log('Saisine created successfully!');
          },
          error: (e) => {
            // Handle the error
            console.error(e);
          },
        });
      }
    }
  }
  OpenSuccessDialog() {
    throw new Error('Method not implemented.');
  }

  Type: string[] = ['Ben Arous', 'Sousse', 'Gafsa'];
  Autre: string[] = ['Avocat', 'Huissier'];

  public openModal() {
    const dialogRef = this.dialog.open(UploadFileModalComponent, {
      data: { name: 'upload File' },
      width: '700px',
      height: '480px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((Myfile) => {
      console.log(Myfile, 'after close popup file');
      this.Saisine_Form.get('formData').setValue(Myfile); // Set the selected file in the form control
    });
  }
}
