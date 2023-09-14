export interface TierElement {
  id:number;
  typeTiers: string;
  nomPrenom: string;
  adresse: string;
  email: string;
  telephone: string;
}
export interface InfDossierElement {
          nomDossier:string,
          phase:string,
          nom:string,
          prenom:string,
          telephone:string,
          adresse:string,
          codepostale:string,
          ville:string,
          gouvernorat:string,
          pays:string,
          raisonSociale:string,
          identifiant:string,
          montantDeCreance:string,
          interetDeRetard:string,
          fraidDeDossier:string,
}
