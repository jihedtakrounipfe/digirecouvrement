import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { NewTiersComponent } from './new-tiers/new-tiers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTiersComponent } from './list-tiers/list-tiers.component';
import { ListDossiersComponent } from './list-dossiers/list-dossiers.component';
import { ListChargesComponent } from './list-charges/list-charges.component';
import { NewChargesComponent } from './new-charges/new-charges.component';
import { UpdateChargesComponent } from './update-charges/update-charges.component';
import { UpdateTiersComponent } from './update-tiers/update-tiers.component';
import { ConsulterDossierComponent } from './consulter-dossier/consulter-dossier.component';
import { PhaseAmiableComponent } from './consulter-dossier/phase-amiable/phase-amiable.component';
import { PhaseJudiciareComponent } from './consulter-dossier/phase-judiciare/phase-judiciare.component';
import { PhasePrecontisieuseComponent } from './consulter-dossier/phase-precontisieuse/phase-precontisieuse.component';
import { DemandeSpecifiqueComponent } from './demande-specifique/demande-specifique.component';
import { ListDossiersFinancierComponent } from './list-dossiers/list-dossiers-financier/list-dossiers-financier.component';
import { ListDossiersDirecteurComponent } from './list-dossiers/list-dossiers-directeur/list-dossiers-directeur.component';
import { NewEcheancierComponent } from './consulter-dossier/phase-amiable/new-echeancier/new-echeancier.component';
import { UpdateEcheancierComponent } from './consulter-dossier/phase-amiable/update-echeancier/update-echeancier.component';
import { UpdateCreanceComponent } from './consulter-dossier/phase-precontisieuse/update-creance/update-creance.component';
import { NewCreanceComponent } from './consulter-dossier/phase-precontisieuse/new-creance/new-creance.component';
import { NewVersementComponent } from './consulter-dossier/phase-precontisieuse/new-versement/new-versement.component';
import { UpdateVersementComponent } from './consulter-dossier/phase-precontisieuse/update-versement/update-versement.component';
import { UpdateFraisComponent } from './consulter-dossier/phase-precontisieuse/update-frais/update-frais.component';
import { NewFraisComponent } from './consulter-dossier/phase-precontisieuse/new-frais/new-frais.component';
import { NewGarantieComponent } from './consulter-dossier/phase-precontisieuse/new-garantie/new-garantie.component';
import { UpdateGarantieComponent } from './consulter-dossier/phase-precontisieuse/update-garantie/update-garantie.component';
import { UpdateSaisineComponent } from './consulter-dossier/phase-precontisieuse/update-saisine/update-saisine.component';
import { NewSaisineComponent } from './consulter-dossier/phase-precontisieuse/new-saisine/new-saisine.component';
import { NewDetailFraisComponent } from './consulter-dossier/phase-judiciare/new-detail-frais/new-detail-frais.component';
import { UpdateDetailFraisComponent } from './consulter-dossier/phase-judiciare/update-detail-frais/update-detail-frais.component';
import { ConsulterVersementComponent } from './list-dossiers/list-dossiers-financier/consulter-versement/consulter-versement.component';
import { ConsulterFraisComponent } from './list-dossiers/list-dossiers-financier/consulter-frais/consulter-frais.component';
import { AlphabetOnlyDirective } from 'app/services/Alphabet-Only.directive';
import { NumbersOnlyDirective } from 'app/services/Numbers-Only.directive';



@NgModule({
  declarations: [ AlphabetOnlyDirective, NumbersOnlyDirective, NewTiersComponent, ListTiersComponent, ListDossiersComponent, ListChargesComponent, NewChargesComponent, UpdateChargesComponent, UpdateTiersComponent, ConsulterDossierComponent, PhaseAmiableComponent, PhaseJudiciareComponent, PhasePrecontisieuseComponent, DemandeSpecifiqueComponent, ListDossiersFinancierComponent, ListDossiersDirecteurComponent, NewEcheancierComponent, UpdateEcheancierComponent, UpdateCreanceComponent, NewCreanceComponent, NewVersementComponent, UpdateVersementComponent, UpdateFraisComponent, NewFraisComponent, NewGarantieComponent, UpdateGarantieComponent, UpdateSaisineComponent, NewSaisineComponent, NewDetailFraisComponent, UpdateDetailFraisComponent, ConsulterVersementComponent, ConsulterFraisComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatOptionModule,
    MatPaginatorModule,
    FormsModule,
  ]
})
export class ModulesModule { }
