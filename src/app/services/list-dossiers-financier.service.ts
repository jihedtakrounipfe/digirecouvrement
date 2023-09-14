import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@alfresco/adf-core';

@Injectable({
  providedIn: 'root'
})
export class ListDossiersFinancierService {
  params = new HttpParams();
  constructor(  private http: HttpClient ,private authService: AuthenticationService){}

    // Create Creance
    CreateFrais(data,nomDossier): Observable<any> {
      let url = `${environment.baseUrl}/s/com/addinn/post/postfraisprecontent?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
      console.log('service data',data)
      return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
    }
    Getfrais(nomDossier): Observable<any>{
      let url = `${environment.baseUrl}/s/com/addinn/get/getfraisprecontent?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
      return this.http.get(url).pipe(catchError(this.errorMgmt));
    }

    // Create Creance
    CreateVersement(data,nomDossier): Observable<any> {
      let url = `${environment.baseUrl}/s/com/addinn/post/postversement?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
      console.log('service data',data)
      return this.http.post( url, data,).pipe(catchError(this.errorMgmt));
    }

    GetVersement(nomDossier): Observable<any> {
      let url = `${environment.baseUrl}/s/com/addinn/get/getversement?nomDossier=${nomDossier}&alf_ticket=${this.authService.getTicketEcm()}`;
      return this.http.get(url).pipe(catchError(this.errorMgmt));
    }

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
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
