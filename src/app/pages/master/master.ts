import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../core/services/master';
import { ApiResponseModel } from '../../core/models/interface/api-response.Model';
import { Category, Role } from '../../core/models/classes/Master.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { Product } from "../product/product";
import { RoleMaster } from "../role-master/role-master";
import { CategoryMaster } from "../category-master/category-master";
import { ProductMaster } from "../product-master/product-master";



@Component({
  selector: 'app-master',
  imports: [ReactiveFormsModule, CommonModule, Product, RoleMaster, CategoryMaster],
  templateUrl: './master.html',
  styleUrl: './master.css',
})
export class Master {

  roleForm!: FormGroup;
  categoryForm!: FormGroup;
  

  currentTabVisiable = signal<string>("Role");

  deleteType: 'ROLE' | 'CATEGORY' | null = null;
  selectedDeleteId: number | null = null;

  roleList = signal<Role[]>([])
  categoryList = signal<Category[]>([])

  formBuilder = inject(FormBuilder)
  mastesrv = inject(MasterService)


  // // This controls which tab is visible
  //   activeTab = signal<'PRODUCT' | 'ROLE' | 'CATEGORY'>('PRODUCT');

  //   // Called when a tab is clicked
  //   onTabChange(tab: 'PRODUCT' | 'ROLE' | 'CATEGORY') {
  //     this.activeTab.set(tab);
  //   }


  constructor() {
    this.createCategoryForm();
    this.createRoleForm()
  }

  ngOnInit(): void {
    this.getAllRole();
    this.categoryList();
    // this.categoryList.set([{ categoryId: 1, name: 'TEST CATEGORY' } as any]);
    this.createRoleForm();
    this.createCategoryForm();
  }


  toggleForm(tabName: string) {
    this.currentTabVisiable.set(tabName)
    if (tabName === 'Category') {
      this.getAllCategory(); //  ensures data always loads
    }

  }

  createRoleForm() {
    this.roleForm = new FormGroup({
      roleId: new FormControl(0),
      roleName: new FormControl('')
    })
  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      categoryId: [0],
      name: ['']
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

  onUpdateRole() {
    const formValue = this.roleForm.value;
    this.mastesrv.updateRole(formValue).subscribe({
      next: () => {
        alert("Role updated");
        const editRec = this.roleList().find(m => m.roleId == formValue.roleId);
        if (editRec !== undefined) {
          editRec.roleName = formValue.roleName;
        }
        //this.roleForm.reset({ roleId: 0, roleName: '' }); // ✅ reset form
        this.getAllRole();
      }
    });
  }

  onUpdateCategory() {
    const formValue = this.categoryForm.value;
    this.mastesrv.updateCategory(formValue).subscribe({
      next: (rs: ApiResponseModel) => {
        alert("Category Updated");
        this.getAllCategory()
      }
    })
  }

  onRoleEdit(roleData: Role) {
    this.roleForm.patchValue(roleData) //reininitialize the value
  }

  //   onCategoryEdit(cat: Category) {
  //   this.categoryForm.setValue(cat);
  // }

  onCategoryEdit(cat: Category) {
    this.categoryForm.patchValue({
      categoryId: cat.categoryId,
      name: cat.name
    });
  }

  onDeleteRole(roleId: number) {
    this.mastesrv.deleteRole(roleId).subscribe({
      next: () => {
        alert('Role Deleted');
        this.getAllRole();
      }
    });
  }

  onDeleteCategory(categoryId: number) {
    this.mastesrv.deleteCategory(categoryId).subscribe({
      next: () => {
        alert('Category Deleted');
        this.getAllCategory();
      }
    });
  }

  onSaveRole() {
    const formValue = this.roleForm.value;
    this.mastesrv.createRole(formValue).subscribe({
      next: () => {
        alert("Role saved");
        // this.roleForm.reset({ roleId: 0, roleName: '' });
        this.getAllRole();
        this.roleForm.reset()
      }
    });
  }

  onSaveCategory() {
    const formValue = this.categoryForm.value;
    this.mastesrv.createCategory(formValue).subscribe({
      next: (rs: ApiResponseModel) => {
        alert("Category Saved");
        this.getAllCategory();

      }
    })
  }

  getAllRole() {
    this.mastesrv.getAllRoles().subscribe({
      next: (rs: ApiResponseModel) => {
        this.roleList.set(rs.data)
      }
    })
  }

  getAllCategory() {
    this.mastesrv.getAllCategory().subscribe({
      next: (rs: ApiResponseModel) => {
        this.categoryList.set(rs.data);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
