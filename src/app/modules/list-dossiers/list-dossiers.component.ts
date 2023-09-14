import { PreviewService } from 'app/services/preview.service';
;
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-dossiers',
  templateUrl: './list-dossiers.component.html',
  styleUrls: ['./list-dossiers.component.css']
})
export class ListDossiersComponent implements OnInit {
  public session: string;

  public subscription:Subscription;
  constructor(
    private api: PreviewService,
    public dialog: MatDialog,
  ) {  }

  ngOnInit(): void {
    //subscriptions by BehaviorSubject
    this.subscription =this.api.castTag.subscribe(data=>{ this.session = data });
  }

}
