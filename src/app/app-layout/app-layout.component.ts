import { PreviewService } from './../services/preview.service';
import { Component, Output ,EventEmitter } from '@angular/core';
import _ from "lodash";
@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  @Output() setSession = new EventEmitter();
  public user_email:any;
  public user_lastName:any;
  public user_firstName:any;
  public user_group:any;
  public user_name:string;
  folderid='recouvrement'
  constructor(private userapi : PreviewService){};


  ngOnInit(): void {
    this.user_name = localStorage.getItem('USER_PROFILE');
    console.log('user profile',this.user_name);
    this.userapi.getuserByGroups(this.user_name).subscribe((data: any) => {
      let filterdUserGroup = data.Groups.find(el => (el == 'GROUP_DIRECTEURS' || el =='GROUP_FINANCIERS' || el =='GROUP_CHARGES' ));
      this.user_group = filterdUserGroup;
      this.user_email = data.email;
      this.user_firstName = data.fullName;
    this.userapi.SetTag(this.user_group);
    this.setSession.emit(this.user_group)
    });

  };

  notification:string[] = [
    'Notification 1',
    'Notification 2',
    'Notification 3',
    'Notification 4',
    'Notification 5',
    'Notification 6',
    'Notification 7',
    'Notification 8',
    'Notification 9',
    'Notification 10',
  ]
}

