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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'lines'})
export class f_li implements PipeTransform {
	transform(val: number): string {
		if(val === 0) return '000';
		else if(val < 100){
			if(val < 10) return '00' + val;
			else return '0' + val;
		}
	}
}