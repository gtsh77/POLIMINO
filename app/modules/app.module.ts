import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { CoreModule }         from './core/core.m';
import { AppRouting, appRoutingProviders }  from './app.routing';


@NgModule({
  imports:      [ BrowserModule, CoreModule, AppRouting ],
  declarations: [ AppComponent ],
  providers: [ appRoutingProviders ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}