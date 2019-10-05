import { Component, OnInit } from '@angular/core';
import {PizzaService} from "../pizza.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.getHistoryItems();
  }

  getHistoryItems() {
    this.pizzaService.fetchHistoryElements()
      .subscribe(response => {
        this.pizzaService.historyItems = response;
        console.log(this.pizzaService.historyItems);
      })
  }

}
