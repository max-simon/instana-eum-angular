import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionCenterComponent } from './action-center/action-center.component';

const routes: Routes = [
  {
    path: 'product/:productId',
    component: ActionCenterComponent,
  },
  {
    path: 'shop/:storeId',
    component: ActionCenterComponent
  },
  {
    path: 'home',
    component: ActionCenterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
