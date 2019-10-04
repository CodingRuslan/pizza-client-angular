import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export interface IngredientItem {
  idingredients: number
  name: string
  timeCook: number,
  imageSrc: string
}

interface CartItem {
  id: number
  name: string
  count: number
  time: number
}

const _apiBase = 'http://localhost:8080';

@Injectable({providedIn: "root"})
export class PizzaService {

  menuListItem: IngredientItem[] = [];
  cartItems: CartItem[] = [];

  constructor(private http: HttpClient) {  }

  fetchElements(): Observable<IngredientItem[]> {
    return this.http.get<IngredientItem[]>(`${_apiBase}/ingredients`)
  }

  updateCartItems = (cartItems: CartItem[], item: CartItem, idx: number) => {
    if (item.count === 0) {
      return [
        ...cartItems.slice(0, idx),
        ...cartItems.slice(idx + 1),
      ];
    }

    if (idx === -1) {
      return [
        ...cartItems,
        item,
      ];
    }

    return [
      ...cartItems.slice(0, idx),
      item,
      ...cartItems.slice(idx + 1),
    ];
  };

  updateCartItem(itemFromMenu:IngredientItem, itemFromCart: CartItem, quantity: number): CartItem {
    if (itemFromCart) {
      return {
        ...itemFromCart,
        count: itemFromCart.count + quantity,
        time: itemFromCart.time + quantity * itemFromMenu.timeCook,
      };
    }
    return {
      id: itemFromMenu.idingredients,
      name: itemFromMenu.name,
      count: 1,
      time: itemFromMenu.timeCook,
    };
  }

  updateOrder(itemId: number, quantity: number): void {
    const itemFromMenu = this.menuListItem.find((e) => e.idingredients === itemId);

    const itemIndexFromCart = this.cartItems.findIndex((e) => e.id === itemId);
    const itemFromCart = this.cartItems[itemIndexFromCart];
    const newItem = this.updateCartItem(itemFromMenu, itemFromCart, quantity);

    this.cartItems = this.updateCartItems(this.cartItems ,newItem, itemIndexFromCart);
  }

  addItemToCart(item: IngredientItem ): void {
    this.updateOrder(item.idingredients, 1);
  }

  removeItemFromCard(item: IngredientItem): void {
    this.updateOrder(item.idingredients, -1)
  }

  removeAllItemFromCart(item: IngredientItem) {
    const currentItem = this.cartItems.find(({ id }) => id === item.idingredients);
    this.updateOrder(item.idingredients, -currentItem.count);

  }

}
