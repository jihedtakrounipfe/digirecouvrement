import { NewTiersComponent } from './modules/new-tiers/new-tiers.component';
/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Routes } from '@angular/router';
import { AuthGuardEcm } from '@alfresco/adf-core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DocumentsComponent } from './documents/documents.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FileViewComponent } from './file-view/file-view.component';
import { NewChargesComponent } from './modules/new-charges/new-charges.component';
import { UpdateChargesComponent } from './modules/update-charges/update-charges.component';
import { ConsulterDossierComponent } from './modules/consulter-dossier/consulter-dossier.component';
import { DemandeSpecifiqueComponent } from './modules/demande-specifique/demande-specifique.component';
import { UpdateTiersComponent } from './modules/update-tiers/update-tiers.component';
import { ListTiersComponent } from './modules/list-tiers/list-tiers.component';
import { ListChargesComponent } from './modules/list-charges/list-charges.component';
import { ListDossiersComponent } from './modules/list-dossiers/list-dossiers.component';
import { ConsulterFraisComponent } from './modules/list-dossiers/list-dossiers-financier/consulter-frais/consulter-frais.component';
import { ConsulterVersementComponent } from './modules/list-dossiers/list-dossiers-financier/consulter-versement/consulter-versement.component';

export const appRoutes: Routes = [
  { path: 'files/:nodeId/view', component: FileViewComponent, canActivate: [AuthGuardEcm], outlet: 'overlay' },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuardEcm],

    children: [
      {
        path: 'home',
        component: HomeComponent
        , canActivate: [AuthGuardEcm]
      },

      {
        path: 'documents',
        component: DocumentsComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'charges',
        component: ListChargesComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'tiers',
        component: ListTiersComponent,
        canActivate: [AuthGuardEcm],
      },
      {
        path: 'new-tier',
        component: NewTiersComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'update-tier/:tiersNom',
        component: UpdateTiersComponent
        , canActivate: [AuthGuardEcm]
      },
      {
        path: 'document-node/:id',
        component: DocumentsComponent
        , canActivate: [AuthGuardEcm]
      },
      {
        path: 'demande-specifique',
        component: DemandeSpecifiqueComponent,
        canActivate: [AuthGuardEcm]

      },
      {
        path: 'consulter',
        component: ConsulterDossierComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'nouv-charge',
        component: NewChargesComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'update-charge/:id',
        component: UpdateChargesComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'consulter-dossier/:nomDossier',
        component: ConsulterDossierComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'consulter-frais/:nomDossier',
        component: ConsulterFraisComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'consulter-versement/:nomDossier',
        component: ConsulterVersementComponent,
        canActivate: [AuthGuardEcm]
      },
      {
        path: 'dossiers',
        component: ListDossiersComponent,
        canActivate: [AuthGuardEcm]
      },

    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
