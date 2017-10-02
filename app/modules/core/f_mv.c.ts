import { Injectable } from '@angular/core';
import { s_gl } from './s_gl.c';
import { f_cr } from './f_cr.c';
import { f_bag } from './f_bag.c';
import { f_tr } from './f_tr.c';

@Injectable()

export class f_mv {
	constructor(private scope: s_gl, private f_cr: f_cr, private f_bag: f_bag, private f_tr: f_tr){}
	//генерация новой фигуры из сумки в т.ч. самой первой
	public next(): void {
		//генерация сумки
		if(!this.scope.bag.length) this.scope.bag = this.f_bag.generate();
		//создание фигуры
		this.scope.curFigureActiveId = this.f_cr.figure(this.scope.bag[0]);
		//пуск таймера если нету другого
		if(!this.scope.move){
			this.scope.move = setInterval(() => {
				console.log('nextTimer');
				this.down();
			},this.scope.speed);			
		}
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
		clearInterval(this.scope.move);
		clearTimeout(this.scope.downKickTimer);
		this.scope.move = null;
		this.scope.downKickTimer = null;
		this.scope.downKickTimer = setTimeout(() => {
			console.log('kickCallBack');
			this.down();
			if(!this.scope.move){
				this.scope.move = setInterval(() => {
					console.log('kickCallBackTimer');
					this.down();
				},this.scope.speed);
			}
		},this.scope.speed);
		this.down();
	}

	public chkForStrike(): void {
		let numOfRows: number[] = [];
		$('.field').find('tr').each((n: number, st: Element)=> {
			let rowBlocks: JQuery = $(st).find('.figure_block');
			if(rowBlocks.length === this.scope.settings.maxColumns){
				rowBlocks.removeClass('figure_block');
				rowBlocks.removeAttr('figure');
				rowBlocks.removeAttr('center');
				rowBlocks.removeAttr('rotation');
				rowBlocks.removeAttr('limit');
				numOfRows.push(n);
				console.log(n);
			}
		});
		if(numOfRows.length) this.rebuildFieldAfterStrike(numOfRows.sort((a,b) => { return a - b;}));
		
	}

	public rebuildFieldAfterStrike(row_n: number[]): void {
		//get figures from every row
		let elemNew: Element[] = [];
		for(let i: number = row_n[0] - 1; i >= 0; i--){
			let curTr: any = $('.field').find('tr').eq(i).find('[figure]');
			let arr: Element[] = [];
			for(let a of curTr) arr.push(a);
			arr.reverse();
			for(let a of arr) elemNew.push(a);
		}
		for(let a of elemNew){
			let curBlock: JQuery = $(a);
			let figureType = curBlock.data('type');
			let figureId = curBlock.attr('figure');			
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let isCenter: string = curBlock.attr('center') || null;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.scope.settings.maxColumns * row) + this.scope.settings.maxColumns);
			curBlock.removeClass(`figure_block`);
			curBlock.removeAttr('figure');
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block`).data('type',figureType).data('column',column).data('row',row + 2).attr('figure',`${figureId}`);
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

	//движение фигуры вниз
	public down(): void {
		//console.info('down');
		//сохраним тип фигуры
		let figureType: string = $(`[figure=${this.scope.curFigureActiveId}]`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`[figure=${this.scope.curFigureActiveId}]`).eq(4 - i);
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.scope.settings.maxColumns * row)));
			//новая фигура
			if((newBlock.attr(`figure`) !== this.scope.curFigureActiveId && newBlock.hasClass('figure_block')) || row === this.scope.settings.maxRows){
				this.scope.curFigureActiveId = null;
				clearInterval(this.scope.move);
				clearTimeout(this.scope.downKickTimer);
				this.scope.move = null;
				this.scope.downKickTimer = null;			
				//конец игры?
				if(this.scope.isNewFigure) console.warn('end_game');
				else {
					this.chkForStrike();
					this.next();
				}
				return;
			}
			else {}
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`[figure=${this.scope.curFigureActiveId}]`).eq(4 - i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.scope.settings.maxColumns * row)));
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс
			curBlock.removeClass(`figure_block`);
			curBlock.removeAttr('figure');
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block`).data('type',figureType).data('column',column).data('row',(row + 1)).attr('figure',`${this.scope.curFigureActiveId}`);
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
		//console.info('left');
		//сохраним тип фигуры
		let figureType: string = $(`[figure=${this.scope.curFigureActiveId}]`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`[figure=${this.scope.curFigureActiveId}]`).eq(0 + i);
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.scope.settings.maxColumns * row) - 1));
			let column: number = curBlock.data('column');
			if((newBlock.attr(`figure`) !== this.scope.curFigureActiveId && newBlock.hasClass('figure_block')) || column === 1) return;
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`[figure=${this.scope.curFigureActiveId}]`).eq(0 + i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.scope.settings.maxColumns * row) - 1);
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс 
			curBlock.removeClass(`figure_block`);
			curBlock.removeAttr('figure');
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block`).data('type',figureType).data('column',(column - 1)).data('row',(row + 1)).attr('figure',`${this.scope.curFigureActiveId}`);
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
		//console.info('right');
		//сохраним тип фигуры
		let figureType: string = $(`[figure=${this.scope.curFigureActiveId}]`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`[figure=${this.scope.curFigureActiveId}]`).eq(4 - i);
			let row: number = curBlock.data('row') - 1;
			let column: number = curBlock.data('column');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.scope.settings.maxColumns * row) + 1));
			if((newBlock.attr(`figure`) !== this.scope.curFigureActiveId && newBlock.hasClass('figure_block')) || column === this.scope.settings.maxColumns) return;
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`[figure=${this.scope.curFigureActiveId}]`).eq(4 - i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.scope.settings.maxColumns * row) + 1);
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс
			curBlock.removeClass(`figure_block`);
			curBlock.removeAttr('figure');
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block`).data('type',figureType).data('column',(column + 1)).data('row',(row + 1)).attr('figure',`${this.scope.curFigureActiveId}`);
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
