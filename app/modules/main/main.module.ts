import { NgModule }      from '@angular/core';

import { mainRouting } from './main.routing';
import { MainComponent }  from './main.component';
import { MainBaseComponent }  from './main.base.component';

@NgModule({
	imports: [ mainRouting ],
	declarations: [ MainComponent, MainBaseComponent ]
})
export class MainModule {}