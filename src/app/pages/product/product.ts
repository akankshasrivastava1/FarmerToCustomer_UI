import { Component } from '@angular/core';
import { Delete } from "../delete/delete";

@Component({
  selector: 'app-product',
  imports: [Delete],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {

  showProductModal = false;

openProductModal() {
  this.showProductModal = true;
}

closeProductModal() {
  this.showProductModal = false;
}
}
