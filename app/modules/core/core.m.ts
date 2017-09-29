import { NgModule }      from '@angular/core';

import { CoreRouting } from './core.r';
import { CoreComponent }  from './core.c';
import { MainComponent }  from './main.c';

import { F_ControlsDirective } from '../../directives/f_controls.dr';

@NgModule({
	imports: [ CoreRouting ],
	declarations: [ CoreComponent, MainComponent, F_ControlsDirective ]
})
export class CoreModule {}