import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MarketplaceItemType } from '../types/marketplace.type';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BasketModalComponent } from '../basket-modal/basket-modal.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartItems: { item: MarketplaceItemType, quantity: number }[] = [];
  cartItemsSub!: Subscription;
  
  constructor(
    public cartService: CartService,private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cartItemsSub = this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }
  
  openBasketModal() {
    this.dialog.open(BasketModalComponent, {
      width: '800px',
      height: '400px',
    });

  }
  ngOnDestroy(): void {
    this.cartItemsSub.unsubscribe();
  }
}

