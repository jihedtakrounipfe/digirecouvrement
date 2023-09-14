import { ListChargeService } from './../../services/list-charges.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-supprimer-consulter-charge-modal',
  templateUrl: './supprimer-consulter-charge-modal.component.html',
  styleUrls: ['./supprimer-consulter-charge-modal.component.css']
})
export class SupprimerConsulterChargeModalComponent implements OnInit {
  numSelected:string[];
  title_label:string="";
  sub_title_label:string="";
  button_label_1:string="";
  button_label_2:string="";
  chargesNom:string[];
  Supprimer_Display:boolean;
  Remplacer_Display:boolean;
  ShoWOldcharge:boolean;
  map = new Map<String, String>();
  charges:any;
  constructor(
    private ChargeApi:ListChargeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SupprimerConsulterChargeModalComponent>) { }
    

  ngOnInit(): void {
    this.listAllCharge();
    this.title_label = this.data.title_label;
    this.sub_title_label = this.data.sub_title_label;
    this.button_label_1  = this.data.button_label_1;
    this.button_label_2  = this.data.button_label_2;
    this.Supprimer_Display = this.data.Supprimer_Display;
    this.Remplacer_Display = this.data.Remplacer_Display;
    this.numSelected = this.data.numSelected;
    this.ShoWOldcharge =this.data.ShoWOldcharge;
  }

  onDesableCharge(){

  if (this.numSelected) {
    this.chargesNom = this.numSelected.map(getName => getName['firstName']);
    console.log(this.chargesNom);
  }
    console.log('Suppression Liste Charges ...', this.chargesNom)
    this.dialogRef.close(this.chargesNom)
  }

  listAllCharge() {
      this.ChargeApi.getAllCharge().subscribe((data: any) => {
        this.charges = data.charges.filter(item => {
            if (item.enabled == "true") {
              return item
            }
          })
        console.log("nouv-chargés",this.charges);
      });
  }

  onRplaceCharge(){
      console.log(this.Remplacer_Form.value,'+++++++++++');
      console.log(this.numSelected[0]['firstName'],'...........')
      let oldCharge = this.numSelected[0]['firstName']
      let newCharge = this.Remplacer_Form.value;
      this.dialogRef.close([{oldCharge},{newCharge}])
  }

  Remplacer_Form = new FormGroup({
      agent: new FormControl("", [ Validators.required ]),
  });
}
