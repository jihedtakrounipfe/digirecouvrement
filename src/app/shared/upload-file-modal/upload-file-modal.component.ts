import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.css']
})
export class UploadFileModalComponent implements OnInit {
  public url:any;
  public file:any;
  public name:any;
  public Base64File:boolean=false;
  public BinaryFile:boolean=true;
  FormData:FormData;
  files:File[]=[];
  constructor(
    private dialogRef: MatDialogRef<UploadFileModalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.name = data.name;
  }

  @HostListener('document:keyup.escape') onClose() {
    this.onCancel();
  }

  onCancel() {
    this.dialogRef.close();
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        this. file = this.url
        console.log('file inf',this.file);
        this.dialogRef.close(this.file);
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit(): void {
  }

  onClickUploadDocument(event:any){
    console.log("clicked");
    var file = event.target.files;

    // console.log(file);
    var formData = new FormData();
    formData.append('file', file[0]);
    this.FormData=formData;
    console.log(this.FormData);
//     for (let i = 0; i < file.length; i++) {
//       let fileInfo = file[i];
//       console.log(fileInfo);
         this.files.push(file[0]);
//       var formData = new FormData();
//       // Array.from(this.files).forEach(f => formData.append('file', f))

//       console.log(formData)
//       this.FormData = formData
//  }

}


onClosePopup(){
  this.dialogRef.close(this.FormData);
}
}
