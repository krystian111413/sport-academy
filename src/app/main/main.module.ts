import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {NavigationModule} from '../navigation/navigation.module';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavigationModule,
    CoreModule
  ]
})
export class MainModule { }
