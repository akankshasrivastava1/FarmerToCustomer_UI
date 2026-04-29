import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../core/models/classes/Master.model';
import { MasterService } from '../../core/services/master';
import { ApiResponseModel } from '../../core/models/interface/api-response.Model';
import { CommonModule } from '@angular/common';
import { MasterNavigation } from "../../shared/master-navigation/master-navigation";

@Component({
  selector: 'app-category-master',
  imports: [ReactiveFormsModule, CommonModule, MasterNavigation],
  templateUrl: './category-master.html',
  styleUrl: './category-master.css',
})
export class CategoryMaster implements OnInit {
  categoryForm!: FormGroup;
  deleteType: 'ROLE' | 'CATEGORY' | null = null;
  selectedDeleteId: number | null = null;
  categoryList = signal<Category[]>([])

  currentTabVisiable = signal<string>("Role");

  formBuilder = inject(FormBuilder)
  mastesrv = inject(MasterService)

  constructor() {
    this.createCategoryForm();
  }

  
ngOnInit(): void {
  this.getAllCategory();  
  console.log('CategoryMaster loaded');
}


  toggleForm(tabName: string) {
    this.currentTabVisiable.set(tabName)
    if (tabName === 'Category') {
      this.getAllCategory(); //  ensures data always loads
    }

  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      categoryId: [0],
      name: ['']
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
  onUpdateCategory() {
    const formValue = this.categoryForm.value;
    this.mastesrv.updateCategory(formValue).subscribe({
      next: (rs: ApiResponseModel) => {
        alert("Category Updated");
        this.getAllCategory()
      }
    })
  }

  onCategoryEdit(cat: Category) {
    this.categoryForm.patchValue({
      categoryId: cat.categoryId,
      name: cat.name
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

  onSaveCategory() {
    const formValue = this.categoryForm.value;
    this.mastesrv.createCategory(formValue).subscribe({
      next: (rs: ApiResponseModel) => {
        alert("Category Saved");
        this.getAllCategory();

      }
    })
  }
}
