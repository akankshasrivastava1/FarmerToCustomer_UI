import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Modal } from 'bootstrap';
import { MasterService } from '../../core/services/master';
import { ApiResponseModel } from '../../core/models/interface/api-response.Model';
import { Category, Role, Product } from '../../core/models/classes/Master.model';
import { ProductMasterItem } from '../../core/models/classes/ProductMaster.model';
import { ProductMasterService } from '../../core/services/product-masters';
import { FarmerProductSrv  } from '../../core/services/FarmerProductSrv';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class Delete implements AfterViewInit {

  @ViewChild('deleteModal') modalEl!: ElementRef;
  @Output() deleted = new EventEmitter<'ROLE' | 'CATEGORY' | 'PRODUCT' | 'PRODUCTMASTER'>();
  private modal!: Modal;

  roleList = signal<Role[]>([]);
  categoryList = signal<Category[]>([]);
  productList = signal<Product[]>([]);
  productmasterList = signal<ProductMasterItem[]>([]);
  mastersrv = inject(MasterService);
  //farmer
  farmerproductSrv  = inject(FarmerProductSrv);
  //admin
  productmaster = inject(ProductMasterService)

  selectedDeleteId: number | null = null;
  deleteType: 'ROLE' | 'CATEGORY' | 'PRODUCT' | 'PRODUCTMASTER' | null = null;

  ngAfterViewInit() {
    this.modal = new Modal(this.modalEl.nativeElement);
  }

  /** This is what other components will call */
  open(type: 'ROLE' | 'CATEGORY' | 'PRODUCT' | 'PRODUCTMASTER' , id: number) {
    this.deleteType = type;
    this.selectedDeleteId = id;
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  onDeleteRole(roleId: number) {
    this.mastersrv.deleteRole(roleId).subscribe({
      next: () => {
        alert('Role Deleted');
        this.deleted.emit('ROLE')
        this.getAllRole();
        this.close();
      }
    });
  }

  onDeleteCategory(categoryId: number) {
    this.mastersrv.deleteCategory(categoryId).subscribe({
      next: () => {
        alert('Category Deleted');
        this.deleted.emit('CATEGORY')
        this.getAllCategory();
        this.close();
      }
    });
  }

  onDeleteProduct(productId: number) {
    this.farmerproductSrv.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product Deleted');
        this.deleted.emit('PRODUCT')
        this.getAllProducts();
        this.close();
      }
    });
  }

  onDeleteProductMaster(productId: number) {
    this.productmaster.deleteProductMaster(productId).subscribe({
      next: () => {
        alert('Master Product Deleted');
        this.deleted.emit('PRODUCTMASTER')
        this.getAllProductMaster();
        this.close();
      }
    });
  }

  getAllRole() {
    this.mastersrv.getAllRoles().subscribe({
      next: (rs: ApiResponseModel) => this.roleList.set(rs.data)
    });
  }

  getAllCategory() {
    this.mastersrv.getAllCategory().subscribe({
      next: (rs: ApiResponseModel) => this.categoryList.set(rs.data)
    });
  }

  getAllProducts() {
    this.farmerproductSrv.getAllProducts().subscribe({
      next: (rs: ApiResponseModel) => this.productList.set(rs.data)
    });
  }

  getAllProductMaster() {
    this.productmaster.getAllProductMaster().subscribe({
      next: (rs: ApiResponseModel) => this.productmasterList.set(rs.data)
    });
  }
}