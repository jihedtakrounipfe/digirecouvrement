import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ListTiersService } from 'app/services/list-tiers.service';
import { PreviewService } from 'app/services/preview.service';

@Component({
  selector: 'app-list-tiers',
  templateUrl: './list-tiers.component.html',
  styleUrls: ['./list-tiers.component.css']
})
export class ListTiersComponent implements OnInit {
  @ViewChild (MatPaginator) paginator: MatPaginator;
  subscription:Subscription;
  displayedColumns: string[] = ['type', 'nomPrenom', 'adresse', 'email', 'telephone','supprimer','modifier'];
  public tiers:any;
  public isVisible: boolean = false;


  constructor(public router: Router,public tiersApi: ListTiersService,private api:PreviewService, private route:ActivatedRoute ) { };

  ngOnInit(): void {
    this.getALLTiers();

    this.subscription = this.api.ReloadTier.subscribe(data =>{data
      console.log('sub data',data);
      if(data=='reload'){
        this.reload()
      }
    })
  };

  getALLTiers(){
    this.tiersApi.getAllTiers().subscribe((data)=>{
      this.tiers = new MatTableDataSource(data.tiers);
      console.log('tiers data', this.tiers)
      this.tiers.paginator = this.paginator;
    });
  }

  deleteTiers(nomtier:string){
    if(confirm("Êtes-vous sûr de vouloir supprimer " + nomtier)) {
      this.tiersApi.deleteTiers(nomtier).subscribe(
        {
          complete: () => {
          console.log('Tiier successfully Delited!'),
          this.router.navigate(['/tiers'],{relativeTo:this.route})
          this.getALLTiers()
          this.api.OpenSuccessDialog
          },
          error: (e) => {
            this.api.OpenEchecDialog
            console.log(e);
        }});
    }
  }

  public UpdateTiers(tiersNom:string) {
    console.log('tiers nom',tiersNom)
    this.router.navigate(['/update-tier/' + tiersNom]);
  }

  gouvernoratList = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kébili',
    'Kef',
    'Mahdia',
    'Manouba',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];
  listcharges = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kébili',
    'Kef',
    'Mahdia',
    'Manouba',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];

  // showAlert() : void {
  //   if (this.isVisible) {
  //     return;
  //   }
  //   this.isVisible = true;
  //   setTimeout(()=> this.isVisible = false,18000)
  // }

  reload(){
    setTimeout(()=> {this.getALLTiers();
      console.log('rfresh 1')},10000);
    setTimeout(()=> {this.getALLTiers();
      console.log('rfresh 2')},12000);
    setTimeout(()=> {this.getALLTiers();
      console.log('rfresh 3')},14000);
    setTimeout(()=> {this.getALLTiers();
      console.log('rfresh 4')},16000);
    setTimeout(()=> {this.getALLTiers();
      console.log('rfresh 5')},18000);
    setTimeout(()=> {this.getALLTiers();
      console.log('rfresh 6')},20000);
  }
}

