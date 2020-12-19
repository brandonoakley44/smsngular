import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { OrderComponent } from './secure/order/order.component';
import { SecureComponent } from './secure/secure.component';
import { StocksComponent } from './secure/stocks/stocks.component';
import { UserComponent } from './secure/user/user.component';
import { UsersComponent } from './secure/users/users.component';

const routes: Routes = [

  {
    path: '', component: SecureComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'user' , component: UserComponent
      },
      {
        path: 'choose' , component: OrderComponent
      },
      {
        path: 'stocks', component: StocksComponent
      }
    ]
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
