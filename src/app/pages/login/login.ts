import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin, UserModel } from '../../core/models/classes/UserModel';
import { UserService } from '../../core/services/user-service';
import { Roles } from '../../core/enum/Role.enum';
import { CommonImports } from '../../core/constant/CommonImports';
import { ApiResponseModel, IRole, LoginResponse } from '../../core/models/interface/api-response.Model';
import { GlobalConstant } from '../../core/constant/Constant';
import { Master } from '../../core/services/master';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonImports.FORM_Imports, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  userSrv = inject(UserService)
  router = inject(Router);
  masterSrv = inject(Master)
  fb = inject(FormBuilder)

  loginObj: UserLogin = new UserLogin(); //object of the class 
  isLoginFormVisiable = signal<boolean>(true);
  roleList = signal<IRole[]>([]);
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onToggleForm(isShow: boolean){
    this.isLoginFormVisiable.set(isShow);
    if(isShow == false){
      this.getAllRoles();
    }
  }

  //how to filter array- using filter method
  // want to check particular record using find()
  // want to check record is present or not - include()
  //what do we use for caching? shareReplay --store the multiple API 
  //reduce api call

  getAllRoles() {
    if (this.roleList().length == 0) {
      this.masterSrv.getAllRoles().subscribe({
        next: (res: ApiResponseModel) => {
          const allowedRoles = res.data.filter((m: IRole) => m.roleName != 'SUPER_ADMIN')
          this.roleList.set(allowedRoles)
        }
      })
    }

  }

  onLogin() {
    const loginDat = {};
   
    this.userSrv.login(this.loginObj).subscribe({
      next:(res:LoginResponse) => {
        debugger;
        localStorage.setItem(GlobalConstant.LOCAL_LOGIN_KEY, JSON.stringify(res.data));
        this.router.navigateByUrl("/home");
      },
      error:(error) =>{
        alert("Wrong Credentials")
      }
    })
  }

  onRegister() {
    if(this.registerForm.invalid) {
      alert('Please fill all required fields correctly');
      return;
    }

    const registerObj = new UserModel();
    registerObj.name = this.registerForm.value.name;
    registerObj.email = this.registerForm.value.email;
    registerObj.password = this.registerForm.value.password;
    registerObj.confirmPassword = this.registerForm.value.confirmPassword;
    registerObj.roleId = this.registerForm.value.roleId;
    registerObj.phone = this.registerForm.value.phone;
    registerObj.address = this.registerForm.value.address;
    // registerObj.userId = 0;
    // registerObj.createdAt = new Date();

    this.userSrv.register(registerObj).subscribe({
      next:(res: ApiResponseModel) => {
        debugger;
        alert('Registration successful! Please login.');
        this.registerForm.reset();
        this.isLoginFormVisiable.set(true);
      },
      error:(error) => {
        debugger;
        alert('Registration failed. Please try again.');
        console.error('Registration error:', error);
      }
    })
  }
}
