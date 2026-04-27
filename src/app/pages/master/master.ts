import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../core/services/master';
import { ApiResponseModel } from '../../core/models/interface/api-response.Model';
import { Category, Role } from '../../core/models/classes/Master.model';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-master',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './master.html',
  styleUrl: './master.css',
})
export class Master implements OnInit{

  roleForm!: FormGroup;
  categoryForm!: FormGroup;

  currentTabVisiable = signal<string>("Role");

  roleList = signal<Role[]>([])
  categoryList = signal<Category[]>([])

  formBuilder = inject(FormBuilder)
  mastesrv = inject(MasterService)

  constructor(){
    this.createCategoryForm();
    this.createRoleForm()
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllRole();
    //this.createRoleForm();
  }

  toggleForm(tabName: string){
    this.currentTabVisiable.set(tabName)
  }

  createRoleForm(){
    this.roleForm = new FormGroup({
      roleId: new FormControl(0),
      roleName: new FormControl('')
    })
  }

  // onUpdateRole(){
  //   const formValue = this.roleForm.value;
  //   this.mastesrv.updateRole(formValue).subscribe({
  //     next:(rs: ApiResponseModel) =>{
  //       alert("role updated");
  //       this.getAllRole()
  //     }
  //   })
  // }
  
onUpdateRole(){
  const formValue = this.roleForm.value;
  this.mastesrv.updateRole(formValue).subscribe({
    next: () => {
      alert("Role updated");
      this.roleForm.reset({ roleId: 0, roleName: '' }); // ✅ reset form
      this.getAllRole();
    }
  });
}
  onRoleEdit(roleData: Role){
    this.roleForm.patchValue(roleData) //reininitialize the value
  }

  // createCategoryForm(){
  //   this.categoryForm = new FormGroup({
  //     categoryId: new FormControl(0),
  //     name: new FormControl('')
  //   })
  // }

  createCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      categoryId: [0],
      name:['']
    })
  }

  getAllCategory(){
    this.mastesrv.getAllCategory().subscribe({
      next:(rs: ApiResponseModel)=>{
        this.categoryList.set(rs.data)

      }
    })
  }

  getAllRole(){
    this.mastesrv.getAllRoles().subscribe({
      next:(rs: ApiResponseModel)=>{
        this.roleList.set(rs.data)
      }
    })
  }

  onSaveRole(){
  const formValue = this.roleForm.value;
  this.mastesrv.createRole(formValue).subscribe({
    next: () => {
      alert("Role saved");
      this.roleForm.reset({ roleId: 0, roleName: '' }); // ✅ reset ID
      this.getAllRole();
    }
  });
}

  onSaveCategory(){
    const formValue = this.categoryForm.value;
    this.mastesrv.createCategory(formValue).subscribe({
      next:(rs: ApiResponseModel) =>{
        alert("Category Saved");
        this.getAllCategory()
      }
    })
  }

  onUpdateCategory(){
    const formValue = this.categoryForm.value;
    this.mastesrv.updateCategory(formValue).subscribe({
      next:(rs: ApiResponseModel) =>{
        alert("Category Updated");
        this.getAllCategory()
      }
    })
  }
}
