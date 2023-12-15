import { Component } from '@angular/core';
import { MarketplaceItemType } from '../../types/marketplace.type';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs'; 


@Component({
  selector: 'app-marketplace-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketplace-item-list.component.html',
  styleUrl: './marketplace-item-list.component.scss'
})
export class MarketplaceItemListComponent {


  productsSub!: Subscription;
  marketplaceItems: MarketplaceItemType [] = [];
  constructor (
    public productsService: ProductService,
    public cartService: CartService,
  ){}
  ngOnInit(): void {
    this.productsSub = this.productsService.getProducts().subscribe(products => {
      this.marketplaceItems = products;
    });
  }

  addToCart = (item: MarketplaceItemType) => {
    this.productsService.markProductAsSelected(item);
    this.cartService.addItem(item);
  }

  removeFromCart = (item: MarketplaceItemType) => {
    this.productsService.markProductAsUnselected(item);
    this.cartService.removeItem(item);
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
