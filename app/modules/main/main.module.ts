import { NgModule }      from '@angular/core';

import { mainRouting } from './main.routing';
import { MainComponent }  from './main.component';
import { MainBaseComponent }  from './main.base.component';

import { ControlsDirective } from '../../directives/controls.directive';

@NgModule({
	imports: [ mainRouting ],
	declarations: [ MainComponent, MainBaseComponent, ControlsDirective ]
})
export class MainModule {}