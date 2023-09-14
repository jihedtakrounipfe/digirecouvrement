import { PreviewService } from 'app/services/preview.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslationService, AuthenticationService, AlfrescoApiService, PageTitleService } from '@alfresco/adf-core';
import { Observable, Subscription, Subject, timer } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private reset$ = new Subject();

  timer$: Observable<any>;
  subscription: Subscription;
  session: string;
  constructor(translationService: TranslationService,
              private authService: AuthenticationService,
              private alfrescoApiService: AlfrescoApiService,
              private pageTitleService: PageTitleService,
              private dialogRef: MatDialog,
              private http: HttpClient,
              private router: Router,
              private api :PreviewService) {
                this.timer$ = this.reset$.pipe(
                  startWith(0),
                  switchMap(() => timer(0, 7000))
                );
              translationService.use('fr');
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {

    this.subscription = this.api.castTag.subscribe(data =>{
      this.session = data;
      if((this.session == "GROUP_FINANCIERS") && (this.authService.isLoggedIn())){
        this.router.navigate(['/dossiers']);
      }
    })

    this.pageTitleService.setTitle('title');

    this.alfrescoApiService.getInstance().on('error', (error) => {
        if (error.status === 401) {
            if (!this.authService.isLoggedIn()) {
                this.dialogRef.closeAll();
                this.router.navigate(['/login']);
            }
        }
    });
  }
}



