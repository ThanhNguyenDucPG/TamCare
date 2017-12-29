import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListUserSelectedPage } from './list-user-selected';

@NgModule({
  declarations: [
    ListUserSelectedPage,
  ],
  imports: [
    IonicPageModule.forChild(ListUserSelectedPage),
  ],
})
export class ListUserSelectedPageModule {}
