import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { Component, ViewChild, Input } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { DocumentListComponent } from '@alfresco/adf-content-services';
import { PreviewService } from '../services/preview.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit , AfterViewInit {
@ViewChild('documentList')
public documentList: DocumentListComponent;
public currentFolderId: string;
public id = this.actRoute.snapshot.params.id;
public showViewer = false;

constructor(
  private actRoute:ActivatedRoute,
  private notificationService: NotificationService,
  private preview: PreviewService) {};

ngOnInit(){
  if(this.id !== 'recouvrement'){
    this.currentFolderId = this.id
  }else{
    this.currentFolderId='-mysites-'
  }
}

clickedNodeId(event:any){
console.log(event,'node Clicked')
}

ngAfterViewInit(){
  console.log( ' docs',  this.documentList);
}

uploadSuccess() {
  this.notificationService.openSnackMessage('File uploaded');
  this.documentList.reload();
}

showPreview(event) {
  const entry = event.value.entry;
  if (entry && entry.isFile) {
    this.preview.showResource(entry.id);
  }
}

}
