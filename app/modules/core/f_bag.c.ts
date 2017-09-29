import { Injectable } from '@angular/core';
import { s_gl } from './s_gl.c';

@Injectable()

export class f_bag {
	constructor(private scope: s_gl){}
	public generate(): string[] {
		let arr: string[] = [];
		let newBag: string[] = [];
		//наполним временной массив
		for(let a in this.scope.rcFigures){
			arr.push(this.scope.rcFigures[a]);
		}
		//рандомно наполним сумку
		while(arr.length){
			let num: number = Math.round(Math.random()* (arr.length - 1));
			newBag.push(arr[num]);
			arr.splice(num,1);
		}
		return newBag;
	}
}