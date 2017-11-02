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