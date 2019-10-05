import { Component, OnInit } from '@angular/core';
import { PizzaService } from "../pizza.service";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})


export class MenuListComponent implements OnInit {

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.pizzaService.loadingStatus = true;
    this.pizzaService.fetchMenuElements()
      .subscribe(response => {
        this.pizzaService.loadingStatus = false;
        this.pizzaService.menuListItem = response
      })
  }
}
