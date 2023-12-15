import { Component,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MarketplaceItemType } from '../types/marketplace.type';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  standalone : true ,
  selector: 'app-basket-modal',
  templateUrl: './basket-modal.component.html',
  styleUrl: './basket-modal.component.scss'
})
export class BasketModalComponent {
  cartItems: { item: MarketplaceItemType; quantity: number }[];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems().value;


  }
  updateQuantity(cartItem: { item: MarketplaceItemType; quantity: number }): void {
    this.cartService.modifyQuantity(cartItem.item, cartItem.quantity);
  }
  removeItem(cartItem: { item: MarketplaceItemType; quantity: number }): void {
    this.cartService.removeItem(cartItem.item);
    cartItem.item.isSelected = false;
  }
  }