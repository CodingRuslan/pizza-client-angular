import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuListComponent} from "./menu-list/menu-list.component";
import {HistoryListComponent} from "./history-list/history-list.component";
import {HistoryListItemDetailsComponent} from "./history-list-item-details/history-list-item-details.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";


const routes: Routes = [
  {path: '', component: MenuListComponent},
  {path: 'history', component: HistoryListComponent},
  {path: 'history/:id', component: HistoryListItemDetailsComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
