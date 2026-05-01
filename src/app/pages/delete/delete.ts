import { Component, inject, signal } from '@angular/core';
import { MasterService } from '../../core/services/master';
import { ApiResponseModel } from '../../core/models/interface/api-response.Model';
import { Category, Role } from '../../core/models/classes/Master.model';

@Component({
  selector: 'app-delete',
  imports: [],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class Delete {

roleList = signal<Role[]>([])
categoryList = signal<Category[]>([])

mastesrv = inject(MasterService)
selectedDeleteId: number | null = null;
deleteType: 'ROLE' | 'CATEGORY' | null = null;

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
