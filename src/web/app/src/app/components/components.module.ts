import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SelectTipComponent } from './select-tip/select-tip.component';
import { ConfirmTipComponent } from './confirm-tip/confirm-tip.component';
import { ThankyouComponent } from './thankyou/thankyou.component';



@NgModule({
  declarations: [
    ProfileComponent,
    SelectTipComponent,
    ConfirmTipComponent,
    ThankyouComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileComponent,
    SelectTipComponent,
    ConfirmTipComponent,
    ThankyouComponent
  ]
})
export class ComponentsModule { }
