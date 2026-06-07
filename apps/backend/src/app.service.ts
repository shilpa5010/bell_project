import { BadRequestException, Injectable } from "@nestjs/common";
import productData from "./data/products.json";
import wishlistData from "./data/wishlist.json";
import { Product } from "./products/products";

@Injectable()
export class AppService {
  private products: Product[] = productData;
  //should store only productid in the wishlist array liek [{id:1}, {id:2}]
  private wishlist: { id: number }[] = wishlistData;

  getStoreName(): { name: string } {
    return { name: "The Tech Library" };
  }
  //Fetching  all products or products based on the type if type is passed as  parameter.
  getProducts(type?: string): Product[] {
    if (type) {
      return this.products.filter(
        (p) => p.type?.toLowerCase() === type?.toLowerCase(),
      );
    }
    return this.products;
  }

  getProductById(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new BadRequestException("Product not found");
    return product;
  }

  getWishlist(): Product[] {
    // console.log(`Current wishlist IDs:`, this.wishlist);
    // throw new Error(`Current wishlist IDs: ${JSON.stringify(this.wishlist)}`);
    return this.wishlist.map((item) => this.getProductById(item.id));
  }

  //Function to handleWishlist
  handleWishlist(productId: number): { id: number }[] {
    console.log(`Handling wishlist for product ID: ${productId}`);
    this.getProductById(productId);
    const exists = this.wishlist.find((p) => p.id === productId);

    if (exists) {
      console.log(
        `Product ID ${productId} already in wishlist, removing it...`,
      );
      this.wishlist = this.wishlist.filter((p) => p.id !== productId);
      return this.wishlist;
    }
    this.wishlist.push({ id: productId });
    return this.wishlist;
  }
}
