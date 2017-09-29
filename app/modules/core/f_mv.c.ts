import { Injectable } from '@angular/core';
import { s_gl } from './s_gl.c';
import { f_cr } from './f_cr.c';
import { f_bag } from './f_bag.c';

@Injectable()

export class f_mv {
	constructor(private scope: s_gl, private f_cr: f_cr, private f_bag: f_bag){}

	public next(): void {
		if(!this.scope.bag.length) this.f_bag.generate();
		this.scope.curFigureActiveId = this.f_cr.figure(this.scope.bag[0]);
		this.scope.move = setInterval(() => {
			this.down();
		},this.scope.speed);
		this.scope.bag.shift();
	}	

	public down(): void {
		console.info('move');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.scope.curFigureActiveId}`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(4 - i);
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.scope.settings.maxColumns * row)));
			//конец игры
			// if($('.field').find('tr').first().children().hasClass('figure_block')){
			// 	this.scope.curFigureActiveId = null;
			// 	clearInterval(this.move);
			// 	this.scope.move = null;
			// 	return;
			// }
			//новая фигура
			if((!newBlock.hasClass(`figure_${this.scope.curFigureActiveId}`) && newBlock.hasClass('figure_block')) || row === this.scope.settings.maxRows){
				this.scope.curFigureActiveId = null;
				clearInterval(this.scope.move);
				this.scope.move = null;
				this.next()
				return;
			}
			else {}
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(4 - i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.scope.settings.maxColumns * row)));
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс
			curBlock.removeClass(`figure_block figure_${this.scope.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.scope.curFigureActiveId}`).data('type',figureType).data('column',column).data('row',(row + 1));
			//если центр фигуры уберем центр и добавим в новый блок
			if(isCenter){
				newBlock.attr('center','true');
				curBlock.removeAttr('center');
				newBlock.attr('rotation',curBlock.attr('rotation'));
				curBlock.removeAttr('rotation');
				newBlock.attr('limit',curBlock.attr('limit'));
				curBlock.removeAttr('limit');				
			}			
		}
	}	
}
