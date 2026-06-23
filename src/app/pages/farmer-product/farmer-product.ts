import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Delete } from "../delete/delete";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IFarmerProductList } from '../../core/models/interface/FarmerProduct.interface'
import { UserModel } from '../../core/models/classes/UserModel';
import { UserService } from '../../core/services/user-service';
import { ProductMasterService } from '../../core/services/product-masters';
import { FarmerProductSrv } from '../../core/services/FarmerProductSrv';
import { MasterService } from '../../core/services/master';
import { ApiResponseModel } from '../../core/models/interface/api-response.Model';
import { ProductMasterItem } from '../../core/models/classes/ProductMaster.model';
import { Alert } from '../../shared/reusables/alert/alert';
import { FarmerProductsClass } from '../../core/models/classes/Product.model';
import { ProductMaster } from "../product-master/product-master";



@Component({
  selector: 'app-product',
  imports: [Delete, ReactiveFormsModule, CommonModule, ProductMaster],
  templateUrl: './farmer-product.html',
  styleUrl: './farmer-product.css',
})
export class FarmerProduct implements OnInit {

  farmerProductForm!: FormGroup;
  farmerProductList = signal<IFarmerProductList[]>([]);
  productList = signal<ProductMasterItem[]>([]);
  isEditMode = signal<boolean>(false);
  imageSource = signal<'file' | 'url'>('file');
  formBuilder = inject(FormBuilder);
  isSubmitting = signal<boolean>(false);
  currentFarmerId = signal<number>(0);
  loggedInUser:  UserModel = new UserModel();
  userService = inject(UserService);
  productmaster = inject(ProductMasterService);
  farmerproductSrv = inject(FarmerProductSrv);
  mastersrv = inject(MasterService);

  currentTabVisiable = signal<string>("Farmer Products");

  @ViewChild(Alert) alerCompInstance!: Alert;

  alertObj: any = {
    alertType:'',
    alertMessage:'',
    alertTitle:''
  }


  constructor() {
    this.initializeFarmerProductForm();
    this.loggedInUser = this.userService.loggedInUser;
  }

  ngOnInit(): void {
    if(this.loggedInUser.roleId ==1) {
       this.getAllProducts();
    } else {
      this.currentFarmerId.set(this.loggedInUser.userId);
      this.getAllProductsByFarmerId();
    }
    this.getProductMaster();
    // this.loadFarmerProducts();
  }

  initializeFarmerProductForm(): void {
    this.farmerProductForm = this.formBuilder.group({
      farmerProductId: [0],
      farmerId: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      pricePerKg: ['', [Validators.required, Validators.min(0)]],
      availableQuantity: ['', [Validators.required, Validators.min(0)]],
      availableDate: ['', [Validators.required]],
      status: ['Available', [Validators.required]],
      productImage: [''],
      imageUrl: [''],
    });
  }

   getProductMaster() {
    this.productmaster.getAllProductMaster().subscribe({
      next:(res:ApiResponseModel)=>{
        this.productList.set(res.data);
      }
    })
  }

  openFarmerProductModal(): void {
    this.isEditMode.set(false);
    this.imageSource.set('file');
    this.resetFarmerProductForm();
  }

  toggleForm(tabName: string) {
    this.currentTabVisiable.set(tabName)
    if (tabName === 'Products') {
      this.getAllProductMaster();
    }

  }

  onEditFarmerProduct(item: IFarmerProductList): void {
    this.isEditMode.set(true);
    const dateObj = new Date(item.availableDate);
    const dateTimeLocal = dateObj.toISOString().slice(0, 16);

    this.farmerProductForm.patchValue({
      farmerProductId: item.farmerProductId,
      farmerId: item.farmerId,
      productId: item.productId,
      pricePerKg: item.pricePerKg,
      availableQuantity: item.availableQuantity,
      availableDate: dateTimeLocal,
      status: item.status,
     // productImage: item.productImage || '',
      imageUrl: item.imageUrl || '',
    });

   // this.imageSource.set(item.imageUrl ? 'url' : 'file');
  }

  onImageSourceChange(source: 'file' | 'url'): void {
    this.imageSource.set(source);
    if (source === 'file') {
      this.farmerProductForm.patchValue({ imageUrl: '' });
    } else {
      this.farmerProductForm.patchValue({ productImage: '' });
    }
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files?.[0];
    if (!file) {
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size should not exceed 5MB');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG, PNG, GIF, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64String = e.target.result;
      this.farmerProductForm.patchValue({
        productImage: base64String,
      });
    };
    reader.readAsDataURL(file);
  }

  getPreviewImage(): string {
    return this.farmerProductForm.get('productImage')?.value || this.farmerProductForm.get('imageUrl')?.value || 'https://via.placeholder.com/200x150?text=Product+Image';
  }

  // onSaveFarmerProduct(): void {
  //   if (this.farmerProductForm.invalid) {
  //     alert('Please fill all required fields correctly');
  //     return;
  //   }

  //   this.isSubmitting.set(true);
  //   const formValue = this.farmerProductForm.getRawValue();
  //   const payload = {
  //     farmerProductId: 0,
  //     farmerId: formValue.farmerId,
  //     productId: formValue.productId,
  //     pricePerKg: formValue.pricePerKg,
  //     availableQuantity: formValue.availableQuantity,
  //     availableDate: new Date(formValue.availableDate).toISOString(),
  //     status: formValue.status
  //   };

  //   this.farmerproductSrv.createProduct(payload).subscribe({
  //     next: (response: ApiResponseModel) => {
  //       alert('Farmer product saved successfully!');
  //       this.resetFarmerProductForm();
  //       // Add the new item locally with image
  //       const newItem: IFarmerProductList = {
  //         farmerProductId: response.data?.farmerProductId || 0,
  //         farmerId: formValue.farmerId,
  //         farmerName: '', // Will be fetched on refresh
  //         productId: formValue.productId,
  //         productName: '', // Will be fetched on refresh
  //         pricePerKg: formValue.pricePerKg,
  //         availableQuantity: formValue.availableQuantity,
  //         availableDate: formValue.availableDate,
  //         status: formValue.status,
  //         productImage: formValue.productImage || formValue.imageUrl || '',
  //         imageUrl: formValue.imageUrl || ''
  //       };
  //       this.farmerProductList.update(list => [...list, newItem]);
  //       const modal = document.getElementById('farmerProductModal') as any;
  //       if (modal) {
  //         const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
  //         bootstrapModal?.hide();
  //       }
  //     },
  //     error: (error) => {
  //       alert('Failed to save farmer product: ' + (error.error?.message || 'Unknown error'));
  //     },
  //     complete: () => {
  //       this.isSubmitting.set(false);
  //     }
  //   });
  // }

   onSaveFarmerProduct() {
    if (this.farmerProductForm.invalid) {
      this.farmerProductForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const payload = this.mapFormToPayload();

    this.farmerproductSrv.createProduct(payload).subscribe({
      next: () => {
        alert('Product saved successfully');
        this.resetFarmerProductForm();
        this.refreshFarmerProductList();
        this.alertObj = {
          alertType: 'Success',
          alertMessage: 'Product Listing Success',
          alertTitle: 'Success'
        };
      },
      error: (err:any) => {
        alert('Unable to save product: ' + (err.error?.message || 'Unknown error'));
        this.alertObj = {
          alertType: 'Error',
          alertMessage: 'Error While Saving Product',
          alertTitle: 'Error'
        };
      },
      complete: () => {
        this.isSubmitting.set(false);
      }
    });
  }

  onUpdateFarmerProduct(): void {
    if (this.farmerProductForm.invalid) {
      alert('Please fill all required fields correctly');
      return;
    }

    this.isSubmitting.set(true);
    const payload = this.mapFormToPayload();

    this.farmerproductSrv.updateProduct(payload).subscribe({
      next: () => {
        alert('Farmer product updated successfully!');
        this.resetFarmerProductForm();
        this.refreshFarmerProductList();
        const modal = document.getElementById('farmerProductModal') as any;
        if (modal) {
          const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
          bootstrapModal?.hide();
        }
      },
      error: (error) => {
        alert('Failed to update farmer product: ' + (error.error?.message || 'Unknown error'));
      },
      complete: () => {
        this.isSubmitting.set(false);
      }
    });
  }

  openDelete(item: IFarmerProductList) {
    if (!item || item.farmerProductId <= 0) {
      alert('Unable to delete: invalid product selection');
      return;
    }

    const isConfirmed = confirm(`Delete product entry #${item.farmerProductId}?`);
    if (!isConfirmed) {
      return;
    }

    this.farmerproductSrv.deleteProduct(item.farmerProductId).subscribe({
      next: () => {
        alert('Product deleted successfully');
        this.refreshFarmerProductList();
        if (this.farmerProductForm.controls['farmerProductId'].value === item.farmerProductId) {
          this.resetFarmerProductForm();
        }
      },
      error: () => {
        alert('Unable to delete product');
      },
    });
  }

  resetFarmerProductForm(): void {
    this.farmerProductForm.reset({
      farmerProductId: 0,
      farmerId: this.currentFarmerId(),
      productId: 0,
      pricePerKg: 0,
      availableQuantity: 0,
      availableDate: this.getTodayDateTimeLocal(),
      status: 'Available',
      productImage: '',
      imageUrl: '',
    });
    this.isEditMode.set(false);
  }

   mapFormToPayload(): FarmerProductsClass {
    const formValue = this.farmerProductForm.getRawValue();
    const payload = new FarmerProductsClass();
    payload.farmerProductId = formValue.farmerProductId;
    payload.farmerId = this.loggedInUser.roleId !== 1 ? this.loggedInUser.userId : formValue.farmerId;
    payload.productId = formValue.productId;
    payload.pricePerKg = formValue.pricePerKg;
    payload.availableQuantity = formValue.availableQuantity;
    payload.availableDate = new Date(formValue.availableDate).toISOString();
    payload.status = formValue.status;
    return payload;
  }

  buildLocalFarmerProductItem(formValue: any): IFarmerProductList {
    const selectedProduct = this.productList().find(p => p.productId === formValue.productId);

    return {
      farmerProductId: 0,
      farmerId: formValue.farmerId,
      farmerName: '',
      productId: formValue.productId,
      productName: selectedProduct?.name || '',
      pricePerKg: formValue.pricePerKg,
      availableQuantity: formValue.availableQuantity,
      availableDate: new Date(formValue.availableDate).toISOString(),
      status: formValue.status,
      productImage: this.imageSource() === 'file' ? formValue.productImage || '' : '',
      imageUrl: this.imageSource() === 'url' ? formValue.imageUrl || '' : '',
    };
  }

  getStatusCount(status: string): number {
    return this.farmerProductList().filter(item => item.status === status).length;
  }

  getTotalQuantity(): number {
    return this.farmerProductList().reduce((total, item) => total + Number(item.availableQuantity), 0);
  }

  getTodayDateTimeLocal(): string {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60000);
    return localTime.toISOString().slice(0, 16);
  }

  refreshFarmerProductList(): void {
    if (this.loggedInUser.roleId === 1) {
      this.getAllProducts();
    } else {
      this.getAllProductsByFarmerId();
    }
  }

  getAllProducts() {
    this.farmerproductSrv.getAllProducts().subscribe({
      next: (response: ApiResponseModel) => {
        this.farmerProductList.set(response.data ?? []);
      },
      error: () => {
        this.farmerProductList.set([]);
      },
    });
  }

  getAllProductsByFarmerId() {
    this.farmerproductSrv.getAllProductsByLoggedFarmer(this.loggedInUser.userId).subscribe({
      next: (response: ApiResponseModel) => {
        this.farmerProductList.set(response.data ?? []);
      },
      error: () => {
        this.farmerProductList.set([]);
      },
    });
  }
  showProductModal = false;

  getAllProductMaster(){
    this.productmaster.getAllProductMaster().subscribe({
      next: (rs: ApiResponseModel) => {
        this.productList.set(rs.data);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  openProductModal() {
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
  }
}