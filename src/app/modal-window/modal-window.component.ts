import { Component, OnInit } from '@angular/core';
import {PizzaService} from "../pizza.service";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
  }

}
