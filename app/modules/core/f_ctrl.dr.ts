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

import { Directive, HostListener, EventEmitter } from '@angular/core';

@Directive({
	selector: '[controls]',
	outputs: ['f_controls_e']
})

export class f_ctrl_dr {
	f_controls_e = new EventEmitter();
	@HostListener("document : keydown", ['$event']) onkeypress(e) {  		
			if(e.keyCode === 37){
				e.preventDefault();
				this.f_controls_e.emit('left');
			}
			else if(e.keyCode === 39){
				e.preventDefault();
				this.f_controls_e.emit('right');
			}
			else if(e.keyCode === 38){
				e.preventDefault();
				this.f_controls_e.emit('transform');
			}
			else if(e.keyCode === 40){
				e.preventDefault();
				this.f_controls_e.emit('downkick');
			}
			else return;
	}
}