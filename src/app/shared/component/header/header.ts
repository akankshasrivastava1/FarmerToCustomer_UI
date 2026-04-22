import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalConstant } from '../../../core/constant/Constant';
import { UserModel } from '../../../core/models/classes/UserModel';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  loggedUserData: UserModel = new UserModel();

  constructor(){
    const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY);
    if(localData != null) {
      this.loggedUserData = JSON.parse(localData)
    }
  }
  onLogOff(){
    localStorage.removeItem(GlobalConstant.LOCAL_LOGIN_KEY);
    this.loggedUserData = new UserModel();
  }
}
