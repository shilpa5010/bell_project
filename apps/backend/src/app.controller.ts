import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { AppService } from "./app.service";
import { Product } from "./products/products";

// wishlist: { id: number }[] = wishlistData; //should store only productid in the wishlist array liek [{id:1}, {id:2}]

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("store-name")
  getStoreName(): { name: string } {
    return this.appService.getStoreName();
  }

  //Get all the products
  @Get("products") //api endpoint
  getProducts(@Query("type") type?: string): Product[] {
    return this.appService.getProducts(type);
  }

  @Get("wishlist") //api endpoint
  getWishlist(): Product[] {
    return this.appService.getWishlist();
  }

  @Post("wishlist")
  handleWishlist(@Body("productId") productId: number): { id: number }[] {
    return this.appService.handleWishlist(productId);
  }
}
