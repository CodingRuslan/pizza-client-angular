import { Component } from '@angular/core';
import {PizzaService} from "./pizza.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private pizzaService: PizzaService) {  }
}
