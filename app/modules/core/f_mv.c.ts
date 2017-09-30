import { Injectable } from '@angular/core';
import { s_gl } from './s_gl.c';
import { f_cr } from './f_cr.c';
import { f_bag } from './f_bag.c';

@Injectable()

export class f_mv {
	constructor(private scope: s_gl, private f_cr: f_cr, private f_bag: f_bag){}

	//генерация новой фигуры из сумки в т.ч. самой первой
	public next(): void {
		if(!this.scope.bag.length) this.scope.bag = this.f_bag.generate();		
		this.scope.curFigureActiveId = this.f_cr.figure(this.scope.bag[0]);
		this.scope.move = setInterval(() => {
			this.down();
		},this.scope.speed);
		this.scope.bag.shift();
	}

	//методы для отладки фигур
	public staticFigure(type: string): string {
		let hash: string = this.scope.curFigureActiveId = this.f_cr.figure(type);
		this.down();
		this.down();
		return hash;
	}

	public stopTimer(): boolean {
		if(this.scope.move){
			clearInterval(this.scope.move);
			this.scope.move = null;
			return true;	
		}
		else return false;		
	}

	public downKick(): void {
		console.info('downKick');
		this.stopTimer();
		clearTimeout(this.scope.downKickTimer);
		this.scope.downKickTimer = setTimeout(() => {
			this.down();
			this.scope.move = setInterval(() => {
				this.down();
			},this.scope.speed);
		},this.scope.speed);
		this.down();
	}

	//движение фигуры вниз
	public down(): void {
		console.info('down');
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
				clearTimeout(this.scope.downKickTimer);
				if(this.scope.isNewFigure) console.warn('end_game');
				else this.next();
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
		if(this.scope.isNewFigure) this.scope.isNewFigure = false;
	}	

	//движение фигуры влево
	public left(): void {
		console.info('left');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.scope.curFigureActiveId}`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(0 + i);
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.scope.settings.maxColumns * row) - 1));
			let column: number = curBlock.data('column');
			if((!newBlock.hasClass(`figure_${this.scope.curFigureActiveId}`) && newBlock.hasClass('figure_block')) || column === 1) return;
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(0 + i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.scope.settings.maxColumns * row) - 1);
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс 
			curBlock.removeClass(`figure_block figure_${this.scope.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.scope.curFigureActiveId}`).data('type',figureType).data('column',(column - 1)).data('row',(row + 1));
			//если центр фигуры уберем центр и добавим в новый блок и сохраним ротацию
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

	//движение фигуры вправо
	public right(): void {
		console.info('right');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.scope.curFigureActiveId}`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(4 - i);
			let row: number = curBlock.data('row') - 1;
			let column: number = curBlock.data('column');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.scope.settings.maxColumns * row) + 1));
			if((!newBlock.hasClass(`figure_${this.scope.curFigureActiveId}`) && newBlock.hasClass('figure_block')) || column === this.scope.settings.maxColumns) return;
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(4 - i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.scope.settings.maxColumns * row) + 1);
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс
			curBlock.removeClass(`figure_block figure_${this.scope.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.scope.curFigureActiveId}`).data('type',figureType).data('column',(column + 1)).data('row',(row + 1));
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
