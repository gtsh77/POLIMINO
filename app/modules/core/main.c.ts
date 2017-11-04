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

import { Component, AfterViewInit } from '@angular/core';
import { f_ctrl } from './f_ctrl.c';
import { f_mv } from './f_mv.c';

@Component({
	templateUrl: 'app/templates/main.html'
})

export class MainComponent {

	constructor(private f_mv: f_mv, private f_ctrl: f_ctrl){}
	public ngAfterViewInit(): void {
		window.scope = this;
		this.f_mv.next();
	}
}

declare var window: any;