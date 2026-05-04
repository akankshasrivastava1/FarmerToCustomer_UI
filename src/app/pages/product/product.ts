import { Component, inject, OnInit, signal } from '@angular/core';
import { Delete } from "../delete/delete";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface FarmerProduct {
  farmerProductId: number;
  farmerId: number;
  productId: number;
  pricePerKg: number;
  availableQuantity: number;
  availableDate: string;
  status: string;
  productImage?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-product',
  imports: [Delete, ReactiveFormsModule, CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  farmerProductForm!: FormGroup;
  farmerProductList = signal<FarmerProduct[]>([]);
  isEditMode = signal<boolean>(false);
  imageSource = signal<'file' | 'url'>('file');
  formBuilder = inject(FormBuilder);

  constructor() {
    this.initializeFarmerProductForm();
  }

  ngOnInit(): void {
    this.loadFarmerProducts();
  }

  initializeFarmerProductForm(): void {
    this.farmerProductForm = this.formBuilder.group({
      farmerProductId: [0],
      farmerId: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      pricePerKg: ['', [Validators.required, Validators.min(0)]],
      availableQuantity: ['', [Validators.required, Validators.min(0)]],
      availableDate: ['', [Validators.required]],
      status: ['Active', [Validators.required]],
      productImage: [''],
      imageUrl: [''],
    });
  }

  openFarmerProductModal(): void {
    this.isEditMode.set(false);
    this.imageSource.set('file');
    this.resetFarmerProductForm();
  }

  onEditFarmerProduct(item: FarmerProduct): void {
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
      productImage: item.productImage || '',
      imageUrl: item.imageUrl || '',
    });

    this.imageSource.set(item.imageUrl ? 'url' : 'file');
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

  onSaveFarmerProduct(): void {
    if (this.farmerProductForm.invalid) {
      alert('Please fill all required fields correctly');
      return;
    }

    const formValue = this.farmerProductForm.value;
    const newProduct: FarmerProduct = {
      farmerProductId: this.farmerProductList().length + 1,
      farmerId: formValue.farmerId,
      productId: formValue.productId,
      pricePerKg: formValue.pricePerKg,
      availableQuantity: formValue.availableQuantity,
      availableDate: formValue.availableDate,
      status: formValue.status,
      productImage: formValue.productImage || '',
      imageUrl: formValue.imageUrl || '',
    };

    this.farmerProductList.set([...this.farmerProductList(), newProduct]);
    alert('Farmer product saved successfully!');
    this.resetFarmerProductForm();

    const modal = document.getElementById('farmerProductModal') as any;
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      bootstrapModal?.hide();
    }
  }

  onUpdateFarmerProduct(): void {
    if (this.farmerProductForm.invalid) {
      alert('Please fill all required fields correctly');
      return;
    }

    const formValue = this.farmerProductForm.value;
    const updatedList = this.farmerProductList().map(item =>
      item.farmerProductId === formValue.farmerProductId
        ? {
            ...item,
            farmerId: formValue.farmerId,
            productId: formValue.productId,
            pricePerKg: formValue.pricePerKg,
            availableQuantity: formValue.availableQuantity,
            availableDate: formValue.availableDate,
            status: formValue.status,
            productImage: formValue.productImage || item.productImage || '',
            imageUrl: formValue.imageUrl || item.imageUrl || '',
          }
        : item
    );

    this.farmerProductList.set(updatedList);
    alert('Farmer product updated successfully!');
    this.resetFarmerProductForm();

    const modal = document.getElementById('farmerProductModal') as any;
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      bootstrapModal?.hide();
    }
  }

  openDelete(farmerProductId: number): void {
    if (confirm('Are you sure you want to delete this farmer product?')) {
      this.farmerProductList.set(this.farmerProductList().filter(item => item.farmerProductId !== farmerProductId));
      alert('Farmer product deleted successfully!');
    }
  }

  resetFarmerProductForm(): void {
    this.farmerProductForm.reset({
      farmerProductId: 0,
      farmerId: '',
      productId: '',
      pricePerKg: '',
      availableQuantity: '',
      availableDate: '',
      status: 'Active',
      productImage: '',
      imageUrl: '',
    });
    this.isEditMode.set(false);
  }

  getStatusCount(status: string): number {
    return this.farmerProductList().filter(item => item.status === status).length;
  }

  getTotalQuantity(): number {
    return this.farmerProductList().reduce((total, item) => total + Number(item.availableQuantity), 0);
  }

  loadFarmerProducts(): void {
    const sampleProducts: FarmerProduct[] = [
      {
        farmerProductId: 1,
        farmerId: 101,
        productId: 1,
        pricePerKg: 45.5,
        availableQuantity: 100,
        availableDate: '2026-05-15T10:00:00',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=200&h=150&fit=crop',
      },
      {
        farmerProductId: 2,
        farmerId: 102,
        productId: 2,
        pricePerKg: 60,
        availableQuantity: 75,
        availableDate: '2026-05-20T14:30:00',
        status: 'Inactive',
        imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd46c4d?w=200&h=150&fit=crop',
      },
    ];
    this.farmerProductList.set(sampleProducts);
  }

  showProductModal = false;

  openProductModal() {
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
  }
}
