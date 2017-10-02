import { NgModule }      from '@angular/core';
import { CommonModule }   from '@angular/common';

import { CoreRouting } from './core.r';
import { CoreComponent }  from './core.c';
import { MainComponent }  from './main.c';

import { s_gl } from './s_gl.c';
import { f_bag } from './f_bag.c';
import { f_cr } from './f_cr.c';
import { f_mv } from './f_mv.c';
import { f_tr } from './f_tr.c';
import { f_ctrl_dr } from './f_ctrl.dr';
import { f_ctrl } from './f_ctrl.c';
import { f_li } from './f_li.p';


@NgModule({
	imports: [ CoreRouting, CommonModule ],
	declarations: [ CoreComponent, MainComponent, f_ctrl_dr, f_li],
	providers: [s_gl, f_cr, f_bag, f_tr, f_mv, f_ctrl, f_li]
})
export class CoreModule {}