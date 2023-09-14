import { environment } from './../../environments/environment';
import { AuthenticationService } from '@alfresco/adf-core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListTiersService {
  params = new HttpParams();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient,private authService: AuthenticationService) { }

  // Create
  createTiers(data): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/dossiertiers`;
    return this.http.post(url, data,{params:this.params}).pipe(catchError(this.errorMgmt));
  }

  // Get All
  getAllTiers(): Observable<any>{
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
                             .delete("tiersNom")
  //console.log('params',this.params)
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/tiers`,{params:this.params})
    .pipe(catchError(this.errorMgmt));
  }

  // Get by Name
  getTierbyName(TierName): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/get/getTiersnom?tiersNom=${TierName}`;
    return this.http.get(url, {params:this.params}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update
  updateTiers(TierName , data): Observable<any> {
    console.log('update tier',TierName,'data',data)
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/updatefolder?tiersNom=${TierName}`;
    return this.http
      .put(url, data, {params:this.params})
      .pipe(catchError(this.errorMgmt));
  }

  // Delete
  deleteTiers(TierName): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/deletefolder?tiersNom=${TierName}`;
    return this.http.delete(url, {params:this.params}).pipe(catchError(this.errorMgmt));
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
