import { environment } from './../../environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '@alfresco/adf-core';

@Injectable({
  providedIn: 'root'
})
export class ListDossiersService {
  params = new HttpParams();
  constructor(  private http: HttpClient ,private authService: AuthenticationService){}

  //---------------------------------------------- Add New Inormations(Post methode) ---------------------------------------------->

  // Get All DossierDirecteurs
  getDossierDirecteurs() {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getlistedossieragent?alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
  }
  // Get All DossierCharges
  getDossierCharges(ChargeName) {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getlistedossieragent?nomAgent=${ChargeName}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
  }
  // Get Folder By Name
  getDossierByName(nomDossier:string) {
  return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getlistedossiername?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
  }
  // Affecter Dossier
  AffecterDossier(data,submittedForm): Observable<any> {
    console.log('service data',submittedForm,data)
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/affecterOuSignaler?nomDossier=${submittedForm}`;
    console.log('params data',url,data)
    return this.http.post(url,data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }
  AffecterDossierParLot(data): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/affecterOuSignaler`;
    return this.http.post(url,data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }
  // Reaffecter Dossier
  ReaffecterDossier(data,nomDossier): Observable<any> {
    console.log('service data',nomDossier,data)
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updatedossieragent?nomDossier=${nomDossier}`;
    console.log('params data',url,data)
    return this.http.put(url,data,{params:this.params}).pipe(catchError(this.errorMgmt));
    }
  // Signaler Dossier
  SignalerDossier(data:string,submittedForm:string): Observable<any> {
    console.log('service data',submittedForm,data)
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/affecterOuSignaler?nomDossier=${submittedForm}`;
    console.log('params data',url,data)
    return this.http.post(url,data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }

  // Massage Relance Dossier
  EnvoyerSMS(data:string,NumDossier:string): Observable<any> {
    console.log('service data',NumDossier,data)
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/messageRelance?nomDossier=${NumDossier}`;
    console.log('params data',url,data)
    return this.http.post(url,data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }

  // EnvoyerValidationDossier
  EnvoyerValidationDossier(data:string,NumDossier:string): Observable<any> {
    console.log('service data',NumDossier,data)
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/verifierPaiment?nomDossier=${NumDossier}`;
    console.log('params data',url,data)
    return this.http.post(url,data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }
  // EnvoyerSignalerDossier
  EnvoyerSignalerDossier(data:string,NumDossier:string): Observable<any> {
    console.log('service data',NumDossier,data)
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/verifierPaiment?nomDossier=${NumDossier}`;
    console.log('params data',url,data)
    return this.http.post(url,data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }
  //AppelerDebiteur Dossier
  AppelerDebiteur(data:string,NumDossier:string): Observable<any> {
    console.log('service data',NumDossier,data)
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/appelerDebiteur?nomDossier=${NumDossier}`;
    console.log('params data',url,data)
    return this.http.post(url,data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }

  //Envoyer Reclamation
  EnvoyerReclamation(data:string,NumDossier:string): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/get/reclamation?text=${data}&nomDossier=${NumDossier}`;
    return this.http.get(url,{params:this.params}).pipe(catchError(this.errorMgmt));
  }

  relanceMessageEnMasse(data): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/relanceMessageEnMasse`;
    console.log('service data',data)
    return this.http.post( url, data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }

  //---------------------------------------------- Add New Inormations(Post methode) ---------------------------------------------->

  // Create Echeancier
  CreateEcheancier(data,nomDossier): Observable<any> {
    let url = `${environment.baseUrl}/s/com/addinn/post/postecheancier?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
    console.log('service data',data)
    return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
  }

  // Create Creance
  CreateCreance(data,nomDossier): Observable<any> {
    let url = `${environment.baseUrl}/s/com/addinn/post/postcreance?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
    console.log('service data',data)
    return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
  }

  // Create Versement
  CreateVersemnt(data,nomDossier): Observable<any> {
    let url = `${environment.baseUrl}/s/com/addinn/post/postversement?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
    console.log('service data',data)
    return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
  }

  // Create Versemnt Precontent
  CreateVersemntPrecontent(data,nomDossier): Observable<any> {
    let url = `${environment.baseUrl}/s/com/addinn/post/postVersementPrecontent?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
    console.log('service data',data)
    return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
  }
  // Create Frais
  CreateFrais(data,nomDossier): Observable<any> {
    let url = `${environment.baseUrl}/s/com/addinn/post/postfraisprecontent?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
    console.log('service data',data)
    return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
  }

  // Create Garantie
  CreateGarantie(data,nomDossier): Observable<any> {
    let url = `${environment.baseUrl}/s/com/addinn/post/postgarantie?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
    console.log('service data',data)
    return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
  }

  // Create Saisine
  CreateSaisine(FormData:FormData, nomDossier: string) {
    let url = `${environment.baseUrl}/s/com/addinn/post/postsaisine?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
    console.log('service data', FormData);
    return this.http.post(url, FormData);
  }


  // Create Detail
  CreateDetail(data,nomDossier): Observable<any> {
    let url = `${environment.baseUrl}/s/com/addinn/post/postfraisjudiciare?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
    console.log('service data',data)
    return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
  }
  //--------------------------------------------- Update Dossier --------------------------------------------------------->

  // Get Echeancier By Name
  getEcheancierbyName(nomDossier:string,data:string) {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getecheanciernom?nomDossier=${nomDossier}&nomEcheancier=${data}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
  }
  //Update Echeancier
  updateEcheancier(echeanciers:any,nomDossier:string,data:string){
    console.log('service elements',)

    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updateEcheanciers?nomDossier=${nomDossier}&nomEcheancier=${data}`;
    return this.http
   .put(url, echeanciers , {params:this.params})
   .pipe(catchError(this.errorMgmt));
  }
  //________________________________________________________________________________________________________________________
  // Get Creance By Name
  getCreancebyName(nomDossier:string,data:string) {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getcreancenom?nomDossier=${nomDossier}&nomCreance=${data}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
  }
  //Update Creance
  updateCreance(creance:any,nomDossier:string,data:string){
    console.log('service elements',creance)

    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updatecreance?nomDossier=${nomDossier}&nomCreance=${data}`;
    return this.http
   .put(url, creance , {params:this.params})
   .pipe(catchError(this.errorMgmt));
  }
  //________________________________________________________________________________________________________________________
  // Get versement By Name
  getVersementName(nomDossier:string,data:string) {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getversementnom?nomDossier=${nomDossier}&nomVersement=${data}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
    }
  //Update versement
  updateVersement(versement:any,nomDossier:string,data:string){
    console.log('service elements',versement)

    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updateversement?nomDossier=${nomDossier}&nomVersement=${data}`;
    return this.http
    .put(url, versement , {params:this.params})
    .pipe(catchError(this.errorMgmt));
    }
  //________________________________________________________________________________________________________________________
  // Get versement By Name
  getFraisbyName(nomDossier:string,data:string) {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getfraisprecontent?nomDossier=${nomDossier}&nomFraisPrec=${data}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
    }
  //Update versement
  updateFrais(frais:any,nomDossier:string,data:string){
    console.log('service frais elements',frais,nomDossier,data)

    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updatefraisprecontent?nomDossier=${nomDossier}&nomFraisPrec=${data}`;
    return this.http
   .put(url, frais , {params:this.params})
   .pipe(catchError(this.errorMgmt));
    }
  //________________________________________________________________________________________________________________________
  // Get garantie By Name
  getGarantiebyName(nomDossier:string,data:string) {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getgarantienom?nomDossier=${nomDossier}&nomGarantie=${data}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
    }
  //Update garantie
  updateGarantie(garantie:any,nomDossier:string,data:string){
    console.log('service frais elements',garantie,nomDossier,data)

    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updategarantie?nomDossier=${nomDossier}&nomGarantie=${data}`;
    return this.http
   .put(url, garantie , {params:this.params})
   .pipe(catchError(this.errorMgmt));
    }
  //________________________________________________________________________________________________________________________
  // Get frias judiciare By Name
  getFraisJudiciarebyName(nomDossier:string,data:string) {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getfriasjudiciarenom?nomDossier=${nomDossier}&nomFraisJud=${data}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
    }
  //Update frias judiciare
  updateFraisJudiciare(frais:any,nomDossier:string,data:string){
    console.log('service frais elements',frais,nomDossier,data)

    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updatefraisjudiciare?nomDossier=${nomDossier}&nomFraisJud=${data}`;
    return this.http
   .put(url, frais , {params:this.params})
   .pipe(catchError(this.errorMgmt));
    }

  //________________________________________________________________________________________________________________________
  // Get versement By Name
  getSaisineName(nomDossier:string,data:string) {
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getsaisinenom?nomDossier=${nomDossier}&nomSaisine=${data}&alf_ticket=${this.authService.getTicketEcm()}`,{responseType: 'json'} )
    .pipe(catchError(this.errorMgmt));
    }
  //Update saisine
  updateSaisine(formData: FormData, nomDossier: string, data: string) {
    console.log('service elements', formData, nomDossier, data);

    this.params = this.params.set("alf_ticket", this.authService.getTicketEcm());
    let url = `${environment.baseUrl}/s/com/addinn/update/updatesaisine?nomDossier=${nomDossier}&nomSaisine=${data}`;
    return this.http
      .put(url, formData, { params: this.params })
      .pipe(catchError(this.errorMgmt));
  }
  //________________________________________________________________________________________________________________________

  updateTelephone(num , nomDossier){
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updatetelephone?nomDossier=${nomDossier}`;
    return this.http.put(url, num , {params:this.params})
    .pipe(catchError(this.errorMgmt));
  }

  updateCodePostale(codePostale , nomDossier){
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/update/updateAdresseDossier?nomDossier=${nomDossier}`;
    console.log(codePostale)
    return this.http.put(url, codePostale , {params:this.params})
    .pipe(catchError(this.errorMgmt));
  }

  //--------------------------------------------- Error handling --------------------------------------------------------->

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }



}

