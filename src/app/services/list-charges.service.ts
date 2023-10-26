import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService} from '@alfresco/adf-core';

@Injectable({
  providedIn: 'root'
})
export class ListChargeService {
  params = new HttpParams();
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient ,private authService: AuthenticationService ) {}
  private Chargestag = new BehaviorSubject<any>([]);
  EmitListCharges = this.Chargestag.asObservable();
  SetTag(Charges:any){
  this.Chargestag.next(Charges);
  };

  // Create
  CreateCharge(data): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm()).set("include","properties")
    let url = `${environment.baseUrl}/api/-default-/public/alfresco/versions/1/people`;
    return this.http.post(url, data,{params:this.params})
    .pipe(catchError(this.errorMgmt));
  }
 // Create
  AddChargeToChargeGroup(data): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm()).set("include","properties")
    let url = `${environment.baseUrl}/api/-default-/public/alfresco/versions/1/groups/GROUP_CHARGES/members`;
    return this.http.post(url, data,{params:this.params})
    .pipe(catchError(this.errorMgmt));
  }

  // Get All
  getAllCharge() {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    let url = `${environment.baseUrl}/s/com/addinn/get/listechargee`;
    return this.http.get(url,{params:this.params})
    .pipe(catchError(this.errorMgmt));
  }

  // Get by Id
  getChargeById(id): Observable<any> {
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    .set("include","properties")
    let url = `${environment.baseUrl}/api/-default-/public/alfresco/versions/1/people/${id}`;
    return this.http.get(url, {params:this.params}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update
  updateCharge( nom , data ): Observable<any> {
    console.log(nom,'id chargé')
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm()).set("include","properties")
    let url = `${environment.baseUrl}/api/-default-/public/alfresco/versions/1/people/${nom}`;
    return this.http.put(url, data, {params:this.params}).pipe(catchError(this.errorMgmt));
  }

  updateChargeDispo( nom , data ): Observable<any> {
    console.log(nom,'id chargé')
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm()).set("include","properties")
    let url = `${environment.baseUrl}/s/com/addinn/updatecharge?nomchargee=${nom}`;
    return this.http.put(url, data, {params:this.params}).pipe(catchError(this.errorMgmt));
  }
  // Update
  RemplacerCharge( nom , data ): Observable<any> {
    console.log(nom,'id new chargé')
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm()).set("include","properties")
    let url = `${environment.baseUrl}/s/com/addinn/remplacerchargee?nomAgent=${nom}`;
    return this.http.post(url, data, {params:this.params}).pipe(catchError(this.errorMgmt));
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


