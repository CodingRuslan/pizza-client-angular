import { Component, OnInit } from '@angular/core';
import { PizzaService } from "../pizza.service";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})


export class MenuListComponent implements OnInit {
  loadingStatus = false;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.loadingStatus = true;
    this.pizzaService.fetchElements()
      .subscribe(response => {
        this.loadingStatus = false;
        this.pizzaService.menuListItem = response
      })
  }
}
