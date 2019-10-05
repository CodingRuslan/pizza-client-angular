import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { Socket } from 'ngx-socket-io';

import { updateOrder } from './service-helpers/cart-service-helper'

export interface IngredientItem {
  idingredients: number
  name: string
  timeCook: number,
  imageSrc: string
}

export interface CartItem {
  id: number
  name: string
  count: number
  time: number
}

interface HistoryItem {
  idclientOrder: number
  userId: number
  cookId: number
  orderDone: number
  timeCooking: string
}

const _apiBase = 'http://localhost:8080';

@Injectable({providedIn: "root"})
export class PizzaService {

  menuListItem: IngredientItem[] = [];
  cartItems: CartItem[] = [];
  historyItems: HistoryItem[] = [];

  loadingStatus = false;
  totalCookingTime: number = 0;
  modalMessage: string = '';

  constructor(private http: HttpClient, private socket: Socket) {  }

  fetchMenuElements(): Observable<IngredientItem[]> {
    return this.http.get<IngredientItem[]>(`${_apiBase}/ingredients`)
  }

  fetchHistoryElements(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${_apiBase}/orders/27`)
  }

  makeOrder() {
    this.http.post(`${_apiBase}/neworder`, {
      "userId": 27,
      "cartItems": this.cartItems.map(e => e.id),
      "timeCooking": this.totalCookingTime
    })
      .subscribe(response => {
        this.socket.emit('submitOrder', response);

        this.cartItems = [];
        this.totalCookingTime = 0;
        this.modalMessage = `Ваш заказ поступил в обработку, пожалуйста дождитесь его приготовления. Номер вашего заказа ${response}`;

        this.socket.on('orderIsReady', (id) => {
          this.modalMessage = `Ваш заказ № ${id} готов!`
        });
      })
  };

  addItemToCart(item: IngredientItem ): void {
    this.destructuringCartResponse(updateOrder(this.menuListItem, this.cartItems, this.totalCookingTime, item.idingredients, 1));
  }

  removeItemFromCard(item: IngredientItem): void {
    this.destructuringCartResponse(updateOrder(this.menuListItem, this.cartItems, this.totalCookingTime, item.idingredients, -1));
  }

  removeAllItemFromCart(item: IngredientItem): void {
    const currentItem = this.cartItems.find(({ id }) => id === item.idingredients);
    this.destructuringCartResponse(updateOrder(this.menuListItem, this.cartItems, this.totalCookingTime, item.idingredients, -currentItem.count));
  }

  destructuringCartResponse (response): void {
    const { cartItems, totalCookingTime } = response;
    this.cartItems = cartItems;
    this.totalCookingTime = totalCookingTime;
  }

}
