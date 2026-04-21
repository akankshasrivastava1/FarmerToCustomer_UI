import { Component, inject } from '@angular/core';
import { UserLogin } from '../../core/models/classes/UserModel';
import { UserService } from '../../core/services/user-service';
import { Roles } from '../../core/enum/Role.enum';
import { CommonImports } from '../../core/constant/CommonImports';

@Component({
  selector: 'app-login',
  imports: [CommonImports.FORM_Imports],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  userSrv = inject(UserService)
  
  loginObj: UserLogin = {
    username:'',
    password:'',
    role:0
  }

  onLogin() {
    const loginDat = {};
    this.loginObj.role = Roles.Farmer;
    this.userSrv.login(this.loginObj).subscribe({

    })
  } 
}
