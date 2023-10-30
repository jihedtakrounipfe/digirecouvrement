import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AffecterDossierComponent } from './affecter-dossier/affecter-dossier.component';
import { SignalerDossierComponent } from './signaler-dossier/signaler-dossier.component';
import { FinancierModalComponent } from './financier-modal/financier-modal.component';
import { SaisineModalComponent } from './saisine-modal/saisine-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

import { MaterialModule } from '@alfresco/adf-core';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { UploadFileModalComponent } from './upload-file-modal/upload-file-modal.component';
import { MessageRelanceModalComponent } from './message-relance-modal/message-relance-modal.component';
import { SupprimerConsulterChargeModalComponent } from './supprimer-consulter-charge-modal/supprimer-consulter-charge-modal.component';




@NgModule({
  declarations: [
    AffecterDossierComponent,
    SignalerDossierComponent,
    FinancierModalComponent,
    SaisineModalComponent,
    ConfirmationModalComponent,
    SuccessMessageComponent,
    UploadFileModalComponent,
    MessageRelanceModalComponent,
    SupprimerConsulterChargeModalComponent,
    ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
