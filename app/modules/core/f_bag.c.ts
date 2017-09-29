import { Injectable } from '@angular/core';
import { s_gl } from './s_gl.c';

@Injectable()

export class f_bag {

	constructor(private scope: s_gl){}

	public generate(): void {
		let arr: string[] = [];

		//наполним временной массив
		for(let a in this.scope.rcFigures){
			arr.push(this.scope.rcFigures[a]);
		}

		//рандомно наполним
		while(arr.length){
			let num: number = Math.round(Math.random()* (arr.length - 1));
			this.scope.bag.push(arr[num]);
			arr.splice(num,1);
		}
	}
}