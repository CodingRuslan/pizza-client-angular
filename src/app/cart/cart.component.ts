import { Component, OnInit } from '@angular/core';
import {PizzaService} from "../pizza.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
  }

  itemAddToCart(id: number) {
    this.pizzaService.addItemToCart(this.pizzaService.menuListItem.find((e) => e.idingredients === id))
  }

  itemRemoveFromCart(id: number) {
    this.pizzaService.removeItemFromCard(this.pizzaService.menuListItem.find((e) => e.idingredients === id))
  }

  allItemRemoveFromCart(id: number) {
    this.pizzaService.removeAllItemFromCart(this.pizzaService.menuListItem.find((e) => e.idingredients === id))
  }

}
