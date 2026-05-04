import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Modal } from 'bootstrap';
import { MasterService } from '../../core/services/master';
import { ApiResponseModel } from '../../core/models/interface/api-response.Model';
import { Category, Role, Product, ProductMasters } from '../../core/models/classes/Master.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class Delete implements AfterViewInit {

  @ViewChild('deleteModal') modalEl!: ElementRef;
  @Output() deleted = new EventEmitter<'ROLE' | 'CATEGORY' | 'PRODUCT' | 'MASTERPRODUCT'>();
  private modal!: Modal;

  roleList = signal<Role[]>([]);
  categoryList = signal<Category[]>([]);
  productList = signal<Product[]>([]);
  masterproductList = signal<ProductMasters[]>([]);
  mastesrv = inject(MasterService);

  selectedDeleteId: number | null = null;
  deleteType: 'ROLE' | 'CATEGORY' | 'PRODUCT' | 'MASTERPRODUCT' | null = null;

  ngAfterViewInit() {
    this.modal = new Modal(this.modalEl.nativeElement);
  }

  /** This is what other components will call */
  open(type: 'ROLE' | 'CATEGORY' | 'PRODUCT' | 'MASTERPRODUCT' , id: number) {
    this.deleteType = type;
    this.selectedDeleteId = id;
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  onDeleteRole(roleId: number) {
    this.mastesrv.deleteRole(roleId).subscribe({
      next: () => {
        alert('Role Deleted');
        this.deleted.emit('ROLE')
        this.getAllRole();
        this.close();
      }
    });
  }

  onDeleteCategory(categoryId: number) {
    this.mastesrv.deleteCategory(categoryId).subscribe({
      next: () => {
        alert('Category Deleted');
        this.deleted.emit('CATEGORY')
        this.getAllCategory();
        this.close();
      }
    });
  }

  onDeleteProduct(productId: number) {
    this.mastesrv.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product Deleted');
        this.deleted.emit('PRODUCT')
        this.getAllProducts();
        this.close();
      }
    });
  }

  onDeleteProductMaster(productId: number) {
    this.mastesrv.deleteProductMaster(productId).subscribe({
      next: () => {
        alert('Master Product Deleted');
        this.deleted.emit('MASTERPRODUCT')
        this.getAllProductMaster();
        this.close();
      }
    });
  }

  getAllRole() {
    this.mastesrv.getAllRoles().subscribe({
      next: (rs: ApiResponseModel) => this.roleList.set(rs.data)
    });
  }

  getAllCategory() {
    this.mastesrv.getAllCategory().subscribe({
      next: (rs: ApiResponseModel) => this.categoryList.set(rs.data)
    });
  }

  getAllProducts() {
    this.mastesrv.getAllProducts().subscribe({
      next: (rs: ApiResponseModel) => this.productList.set(rs.data)
    });
  }

  getAllProductMaster() {
    this.mastesrv.getAllProductMaster().subscribe({
      next: (rs: ApiResponseModel) => this.masterproductList.set(rs.data)
    });
  }
}