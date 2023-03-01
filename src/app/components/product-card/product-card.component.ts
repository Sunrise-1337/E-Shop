import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() item!: Product;
  @Output() toAddProduct: EventEmitter<Product> = new EventEmitter;

  addToCart(): void{
    this.toAddProduct.emit(this.item)
  }
}
