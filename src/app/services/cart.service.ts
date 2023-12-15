import { Injectable } from '@angular/core';
import { MarketplaceItemType } from '../types/marketplace.type';
import { BehaviorSubject } from 'rxjs';
import { MarketplaceComponent } from '../marketplace/marketplace.component';
import { MarketplaceItemListComponent } from '../marketplace/marketplace-item-list/marketplace-item-list.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = new BehaviorSubject<Array<{ item: MarketplaceItemType, quantity : number}>>([]);

  constructor() { }

  getCartItems = ()  => this._cartItems;

  addItem = (item: MarketplaceItemType, quantity = 1 ) => {
    if (quantity <= 0) {
      alert('Invalid quantity. Quantity must be greater than zero.');
      return;
    }
    const currentCartItems = this._cartItems.getValue();
    const searchItem = currentCartItems.find(i => i.item.id === item.id);
    if (searchItem) {
      searchItem.quantity += quantity;
      console.log(`Product ${item.title} already in the cart, quantity updated.`);

    } else {
      currentCartItems.push({
        item,
        quantity
      });
      alert(`Product ${item.title} added to the cart.`);
    }
    this._cartItems.next(currentCartItems);
  }
  modifyQuantity = ( item : MarketplaceItemType, newQuantity : number) =>{
    if (newQuantity <= 0) {
      alert('Invalid quantity. Quantity must be greater than zero.');
      return;
    }
    let currentCartItems = this._cartItems.getValue();
    const foundItem = currentCartItems.find((i) => i.item.id === item.id);
    if (foundItem) {
      foundItem.quantity = newQuantity;
      
    }
    this._cartItems.next(currentCartItems);
  }
  removeItem = (item: MarketplaceItemType) => {
    let currentCartItems = this._cartItems.getValue();
    currentCartItems = currentCartItems.filter(i => i.item.id !== item.id);
    this._cartItems.next(currentCartItems);
  }
}