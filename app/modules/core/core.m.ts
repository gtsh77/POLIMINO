// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// If it is not possible or desirable to put the notice in a particular
// file, then You may include the notice in a location (such as a LICENSE
// file in a relevant directory) where a recipient would be likely to look
// for such a notice.

// POLIMINO 2-D WEB PUZZLE GAME
// Copyright (C) 2017  Anton Makridin
// Telegram: http://t.me/gtsh77, Email: me@anton-makridin.ru

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
import { f_le } from './f_le.p';


@NgModule({
	imports: [ CoreRouting, CommonModule ],
	declarations: [ CoreComponent, MainComponent, f_ctrl_dr, f_li, f_le],
	providers: [s_gl, f_cr, f_bag, f_tr, f_mv, f_ctrl]
})
export class CoreModule {}