import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'level'})
export class f_le implements PipeTransform {
transform(val: number): string {
	if(val === 0) return '00';
		if(val < 10) return '0' + val;
		else return val	;
	}
}