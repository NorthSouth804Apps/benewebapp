import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() serviceProvider: Subject<any>;

  serviceProviderName = '';
  serviceProviderImg = '';
  serviceProviderMessage = "It's been a pleasure serving you.";
  thankYouMessage ="Thank you!";
  constructor() { }

  ngOnInit(): void {
    this.subscribeToParent();
  }


  subscribeToParent(){
    this.serviceProvider.subscribe(user1 => {
      console.log('profile',user1.user.user);
      if(user1 && user1.user.lastName && user1.user.lastName.length > 0){
        let user = user1.user;
        this.serviceProviderName = user.firstName +' '+user.lastName.charAt(0);
      }

      if(user1 && user1.user.profilePic){
        this.serviceProviderImg = user1.user.profilePic;
      }

      
    });
  }
}
