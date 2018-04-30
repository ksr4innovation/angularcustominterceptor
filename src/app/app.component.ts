import { TokenStorage } from './token.storage';
import { Component } from '@angular/core';
import { User } from './auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  email : string;
  token : string;

  userResp : User  ;

  constructor(private tokenStorage : TokenStorage){
    this.userResp = null;
    console.log('   from constructor method ');
    tokenStorage.auth().subscribe(data => {
      console.log('   from atuh method '+data);

      console.log('   from atuh method '+data.token);
      console.log('   from atuh method '+data.email);

      this.email = data.email;
      this.token = data.token;

      tokenStorage.saveToken(data.token);
    });
    console.log('   from constructor method ');
  }

  userDetails(){
    this.tokenStorage.userDetail().subscribe(data => {
      this.userResp  = data;
    });
  }
}
