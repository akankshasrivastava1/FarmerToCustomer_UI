import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, ProductMasters } from '../../core/models/classes/Master.model';
import { MasterService } from '../../core/services/master';
import { ApiResponseModel } from '../../core/models/interface/api-response.Model';
import { CommonModule } from '@angular/common';
import { Delete } from "../delete/delete";

@Component({
  selector: 'app-product-master',
  imports: [ReactiveFormsModule, CommonModule, Delete],
  templateUrl: './product-master.html',
  styleUrl: './product-master.css',
})
export class ProductMaster implements OnInit {
  productForm!: FormGroup;
  deleteType: 'PRODUCT' | null = null;
  selectedDeleteId: number | null = null;
  productList = signal<ProductMasters[]>([]);
  categoryList = signal<Category[]>([]);
  isEditMode = signal<boolean>(false);
  searchTerm = signal<string>('');

  formBuilder = inject(FormBuilder);
  masterSrv = inject(MasterService);

  @ViewChild(Delete) deleteComp!: Delete;

  constructor() {
    this.createProductForm();
  }

  ngOnInit(): void {
    //this.getAllProducts();
    this.getAllProductMaster();
    this.getAllCategories();
    console.log('ProductMaster loaded');
  }

  openDelete(productId: number) {
    this.deleteComp.open('MASTERPRODUCT', productId);
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      productId: [0],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      //price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  getAllProducts() {
    this.masterSrv.getAllProducts().subscribe({
      next: (rs: ApiResponseModel) => {
        this.productList.set(rs.data);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  getAllProductMaster() {
    this.masterSrv.getAllProductMaster().subscribe({
      next: (rs: ApiResponseModel) => {
        this.productList.set(rs.data);
      }
    });
  }
  getAllCategories() {
    this.masterSrv.getAllCategory().subscribe({
      next: (rs: ApiResponseModel) => {
        this.categoryList.set(rs.data);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  onSaveProduct() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      this.masterSrv.createProduct(formValue).subscribe({
        next: (rs: ApiResponseModel) => {
          alert('Product Saved Successfully');
          //this.getAllProducts();
          this.getAllProductMaster()
          this.resetProductForm();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error saving product:', err);
          alert('Error saving product');
        }
      });
    }
  }

  onUpdateProduct() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      this.masterSrv.updateProduct(formValue).subscribe({
        next: (rs: ApiResponseModel) => {
          alert('Product Updated Successfully');
          this.getAllProductMaster();
          this.resetProductForm();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating product:', err);
          alert('Error updating product');
        }
      });
    }
  }

  onProductEdit(product: ProductMasters) {
    this.isEditMode.set(true);
    this.productForm.patchValue({
      productId: product.productId,
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      image: product.image
    });
  }

  onDeleteProduct(productId: number) {
    this.masterSrv.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product Deleted Successfully');
        this.getAllProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        alert('Error deleting product');
      }
    });
  }

  resetProductForm() {
    this.productForm.reset({
      productId: 0,
      name: '',
      description: '',
      categoryId: 0,
      image: ''
    });
    this.isEditMode.set(false);
  }

  openModal() {
    this.isEditMode.set(false);
    this.resetProductForm();
  }

  closeModal() {
    const modal = document.getElementById('productModal') as any;
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      bootstrapModal?.hide();
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categoryList().find(cat => cat.categoryId === categoryId);
    return category ? category.name : 'N/A';
  }

  getFilteredProducts() {
    const search = this.searchTerm().toLowerCase();
    if (!search) return this.productList();
    return this.productList().filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    );
  }

  getDashboardStats() {
    const products = this.productList();
    return {
      totalProducts: products.length,
      // totalValue: products.reduce((sum, p) => sum + (p.price || 0), 0),
      //avgPrice: products.length > 0 ? products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length : 0,
      totalCategories: new Set(products.map(p => p.categoryId)).size
    };
  }
}
