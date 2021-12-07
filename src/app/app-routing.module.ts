import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GratuityComponent } from './gratuity/gratuity.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { ThankyouComponent } from './shared/thankyou/thankyou.component';

const routes: Routes = [
  { path: 'gratuity', component: GratuityComponent},
  { path: 'not-found', component: NotfoundComponent},
  { path: 'thanks', component: ThankyouComponent},
  { path: '',   redirectTo: '/gratuity', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
