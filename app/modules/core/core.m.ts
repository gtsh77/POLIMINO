import { NgModule }      from '@angular/core';

import { CoreRouting } from './core.r';
import { CoreComponent }  from './core.c';
import { MainComponent }  from './main.c';

import { f_cr } from './f_cr.c';
import { s_gl } from './s_gl.c';
import { F_ControlsDirective } from '../../directives/f_controls.dr';


@NgModule({
	imports: [ CoreRouting ],
	declarations: [ CoreComponent, MainComponent, F_ControlsDirective],
	providers: [f_cr, s_gl]
})
export class CoreModule {}