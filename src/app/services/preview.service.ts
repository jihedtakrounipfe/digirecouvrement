
import { HttpErrorResponse,HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError ,of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService, } from '@alfresco/adf-core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from 'app/shared/success-message/success-message.component';
import { environment } from 'environments/environment';


@Injectable()
export class PreviewService {
  params = new HttpParams();
  headers = new HttpHeaders().set('Content-Type', 'application/json');
    public content: Blob = null;
    public name: string = null;
    constructor(private router: Router ,private http: HttpClient, private authService: AuthenticationService,public dialog: MatDialog, ) {}

    showResource(resourceId): void {
        this.router.navigate([{ outlets: { overlay: ['files', resourceId, 'view'] } }]);
    }

    showBlob(name: string, content: Blob): void {
        this.name = name;
        this.content = content;
        this.router.navigate([{ outlets: { overlay: ['preview', 'blob'] } }]);
    }

    getuserByGroups(user){
      return this.http.get(`${environment.baseUrl}/s/com/addinn/get/getGroups?userName=${user}&alf_ticket=${this.authService.getTicketEcm()}`)
      .pipe(catchError(this.errorMgmt));
    }

    private tag = new BehaviorSubject<string>('');
    castTag = this.tag.asObservable();
    SetTag(user_group:any){
    this.tag.next(user_group);
    };

    private echeancier = new BehaviorSubject<string>('');
    echeancierTag = this.echeancier.asObservable();
    SetSelctedEch(Selected:any){
    this.echeancier.next(Selected);
    };

    private creance = new BehaviorSubject<string>('');
    creanceTag = this.creance.asObservable();
    SetSelctedCr(Selected:any){
    this.creance.next(Selected);
    };

    private versement = new BehaviorSubject<string>('');
    versementTag = this.versement.asObservable();
    SetSelctedVers(Selected:any){
    this.versement.next(Selected);
    };

    private frais = new BehaviorSubject<string>('');
    fraisTag = this.frais.asObservable();
    SetSelctedFrais(Selected:any){
    this.frais.next(Selected);
    };

    private garantie = new BehaviorSubject<string>('');
    garantieTag = this.garantie.asObservable();
    SetSelctedGar(Selected:any){
    this.garantie.next(Selected);
    };

    private saisine = new BehaviorSubject<string>('');
    saisineTag = this.saisine.asObservable();
    SetSelctedSaisine(Selected:any){
    this.saisine.next(Selected);
    };

    private fraisJudiciaire = new BehaviorSubject<string>('');
    fraisJdcTag = this.fraisJudiciaire.asObservable();
    SetSelctedFraisJdc(Selected:any){
    this.fraisJudiciaire.next(Selected);
    };

    private reloadData = new BehaviorSubject<string>('');
    ReloadTier = this.reloadData.asObservable();
    SetReload(reloadTier:string){
    this.reloadData.next(reloadTier);
    };

    private reloadInfData = new BehaviorSubject<string>('');
    ReloadConsulterTag = this.reloadInfData.asObservable();
    SetinfReload(reload:any){
    this.reloadInfData.next(reload);
    console.log('refresh consulter',reload)
    };


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

  public OpenEchecDialog() {
    this.dialog.open(SuccessMessageComponent, {
      width: '500px',
      height: '250px',
      data:{
        title_label: 'Échec',
        sub_title_label: 'Merci de vérifier',
        button_label: 'Ok',
        success_icon:false,
        echec_icon:true
      }
  });
  }

  public OpenSuccessDialog() {
    this.dialog.open(SuccessMessageComponent, {
      width: '500px',
      height: '250px',
      data:{
        title_label: 'Succès',
        sub_title_label: 'Effectuée avec succès',
        button_label: 'Ok',
        success_icon:true,
        echec_icon:false
      }
  });
  }

  listetaches(nomAgent){
    this.params = this.params.set("alf_ticket",this.authService.getTicketEcm())
    return this.http.get(`${environment.baseUrl}/s/com/addinn/get/listeTaches?nomAgent=${nomAgent}`,{params:this.params})
      .pipe(catchError(this.errorMgmt));
  }


  getCodePostale(): Observable<TasksCharge[]> {
    return of(this.CodePostale);
  }

    CodePostale = [
      {code: '2035', ville: 'Tunis Carthage ', gouvernorat: 'Ariana'},
      {code: '2001', ville: 'Cité Ennasr Ariana', gouvernorat: 'Ariana'},
      {code: '2027', ville: 'Borj Baccouch', gouvernorat: 'Ariana'},
      {code: '2036', ville: 'Soukra', gouvernorat: 'Ariana'},
      {code: '2080', ville: 'Ariana', gouvernorat: 'Ariana'},
      {code: '2002', ville: 'Ariana Géant ', gouvernorat: 'Ariana'},
      {code: '2091', ville: 'Menzah 6 ', gouvernorat: 'Ariana'},
      {code: '2083', ville: 'Cité La Gazelle', gouvernorat: 'Ariana'},
      {code: '9070', ville: 'Mjaz Elbab ', gouvernorat: 'Beja'},
      {code: '9040', ville: 'Teboursouk ', gouvernorat: 'Beja'},
      {code: '9000', ville: 'Beja', gouvernorat: 'Beja'},
      {code: '9032', ville: 'Dougga', gouvernorat: 'Beja'},
      {code: '2098', ville: 'Rades Medina', gouvernorat: 'Ben arous'},
      {code: '1145', ville: 'Mhamdia', gouvernorat: 'Ben arous'},
    ];
}
export interface TasksCharge {
  code: string;
  ville: string;
  gouvernorat: string;
}


