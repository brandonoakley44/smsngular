import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { StocksComponent } from './stocks/stocks.component';
import {ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SecureComponent,    NavComponent,
    MenuComponent,
    DashboardComponent,
    UsersComponent,
    UserComponent,
    OrderComponent,
    StocksComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SecureComponent
  ]
})
export class SecureModule { }
