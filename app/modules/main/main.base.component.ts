import { Component, OnInit, HostListener } from '@angular/core';

interface ISettings {
	maxRows: number;
	maxColumns: number;
}

@Component({
	templateUrl: 'app/templates/main.html',
	styleUrls: ['app/templates/main.css']
})

export class MainBaseComponent {

	private curFigureActiveId: string = null;
	private settings: ISettings = {
		'maxRows': 20,
		'maxColumns': 12
	}
	private move: any = null;

	public ngOnInit(): void {
		window.scope = this;
		//this.move = this.createFigure('F');
	}

	// public createPlayField(): void {
	// 	let elTbody: Element = document.querySelector('.field');
	// 	for(let j: number = 0; j < this.settings.maxColumns; j++){
	// 		let elTr: Element = document.createElement('tr');			
	// 		for(let i: number = 0; i < this.settings.maxColumns; i++){
	// 			let elTd: Element = document.createElement('td');
	// 			elTd.classList.add('block');
	// 			elTr.appendChild(elTd);
	// 		}
	// 		elTbody.appendChild(elTr);
	// 	}	
	// }

	public createFigure(type: string): any {
		//создадим уникальный id
		let hash: string = chance.hash({length: 8});
		//объявим фигуру активной
		this.curFigureActiveId = hash;
		if(type === 'a'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','a').data('row',1).data('column',3);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',2);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',3);
			$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','a').data('row',3).data('column',2);
			//установим центр
			$('.block').eq(13).attr('center','true');

		}
		else if(type === 'a2'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',1).data('column',1);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',2);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',3);
			$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',3).data('column',2);
			//установим центр
			$('.block').eq(13).attr('center','true');	
		}
		else if(type === 'b'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(24).addClass(`figure_block figure_${hash}`).data('type','b').data('row',3).data('column',1);
			$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','b').data('row',3).data('column',2);
			$('.block').eq(26).addClass(`figure_block figure_${hash}`).data('type','b').data('row',3).data('column',3);
			$('.block').eq(27).addClass(`figure_block figure_${hash}`).data('type','b').data('row',3).data('column',4);
			$('.block').eq(28).addClass(`figure_block figure_${hash}`).data('type','b').data('row',3).data('column',5);
			//установим центр
			$('.block').eq(26).attr('center','true');						
		}		
		else if(type === 'c'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',3);
			$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',4);
			$('.block').eq(15).addClass(`figure_block figure_${hash}`).data('type','c').data('row',2).data('column',4);
		}
		else if(type === 'c2'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',3);
			$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',4);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',2).data('column',1);
		}
		else if(type === 'd'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','d').data('row',1).data('column',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','d').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','d').data('row',1).data('column',3);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','d').data('row',2).data('column',3);
			$('.block').eq(15).addClass(`figure_block figure_${hash}`).data('type','d').data('row',2).data('column',4);	
		}
		else if(type === 'd2'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',1).data('column',3);
			$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',1).data('column',4);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',2).data('column',2);	
		}
		else if(type === 'e'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','e').data('row',1).data('column',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','e').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','e').data('row',1).data('column',3);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','e').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','e').data('row',2).data('column',2);		
		}
		else if(type === 'e2'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',1).data('column',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',1).data('column',3);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',2).data('column',2);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',2).data('column',3);		
		}
		else if(type === 'f'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1).data('column',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1).data('column',3);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','f').data('row',2).data('column',2);
			$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','f').data('row',3).data('column',2);		
		}
		else if(type === 'g'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','g').data('row',1).data('column',1);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','g').data('row',1).data('column',3);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','g').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','g').data('row',2).data('column',2);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','g').data('row',2).data('column',3);		
		}
		else if(type === 'h'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','g').data('row',1).data('column',1);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','g').data('row',2).data('column',1);
			$('.block').eq(24).addClass(`figure_block figure_${hash}`).data('type','g').data('row',3).data('column',1);
			$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','g').data('row',3).data('column',2);
			$('.block').eq(26).addClass(`figure_block figure_${hash}`).data('type','g').data('row',3).data('column',3);		
		}
		else if(type === 'k'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','k').data('row',1).data('column',1);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','k').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','k').data('row',2).data('column',2);
			$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','k').data('row',3).data('column',2);
			$('.block').eq(26).addClass(`figure_block figure_${hash}`).data('type','k').data('row',3).data('column',3);		
		}
		else if(type === 'l'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','l').data('row',1).data('column',2);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',2);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',3);
			$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','l').data('row',3).data('column',2);		
		}
		else if(type === 'm'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','m').data('row',1).data('column',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','m').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','m').data('row',1).data('column',3);
			$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','m').data('row',1).data('column',4);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','m').data('row',2).data('column',3);		
		}
		else if(type === 'm2'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',1).data('column',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',1).data('column',2);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',1).data('column',3);
			$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',1).data('column',4);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',2).data('column',2);		
		}
		else if(type === 'n'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','n').data('row',1).data('column',1);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','n').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','n').data('row',2).data('column',2);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','n').data('row',2).data('column',3);
			$('.block').eq(26).addClass(`figure_block figure_${hash}`).data('type','n').data('row',3).data('column',3);		
		}
		else if(type === 'n2'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',1).data('column',3);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',2).data('column',1);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',2).data('column',2);
			$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',2).data('column',3);
			$('.block').eq(24).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',3).data('column',1);		
		}
		else {}
		return setInterval(() => {
			this.moveFigure();
		},500);
	}

	public moveFigure(): void {
		console.info('move');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.curFigureActiveId}`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(4 - i);
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.settings.maxColumns * row)));
			if((!newBlock.hasClass(`figure_${this.curFigureActiveId}`) && newBlock.hasClass('figure_block')) || row === this.settings.maxRows){
				this.curFigureActiveId = null;
				clearInterval(this.move);
				this.move = null;
				return;
			}
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(4 - i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.settings.maxColumns * row)));
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс
			curBlock.removeClass(`figure_block figure_${this.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.curFigureActiveId}`).data('type',figureType).data('column',column).data('row',(row + 1));
			//если центр фигуры уберем центр и добавим в новый блок
			if(isCenter){
				curBlock.removeAttr('center');
				newBlock.attr('center','true');
				newBlock.attr('rotation',curBlock.attr('rotation'));
				curBlock.removeAttr('rotation');				
			}			
		}
	}

	public controlKey(direction: string): void {
		if(direction === 'left') this.moveFigureLeft();
		else if(direction === 'right') this.moveFigureRight();
		else if(direction === 'transform') this.rotateFigure();
		else return;
	}

	public moveFigureRight(): void {
		console.info('moveRight');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.curFigureActiveId}`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(4 - i);
			let column: number = curBlock.data('column');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + 1));
			if((!newBlock.hasClass(`figure_${this.curFigureActiveId}`) && newBlock.hasClass('figure_block')) || column === this.settings.maxColumns) return;
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(4 - i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.settings.maxColumns * row) + 1);
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс
			curBlock.removeClass(`figure_block figure_${this.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.curFigureActiveId}`).data('type',figureType).data('column',(column + 1)).data('row',(row + 1));
			//если центр фигуры уберем центр и добавим в новый блок
			if(isCenter){
				curBlock.removeAttr('center');
				newBlock.attr('center','true');
				newBlock.attr('rotation',curBlock.attr('rotation'));
				curBlock.removeAttr('rotation');				
			}			
		}
	}

	public moveFigureLeft(): void {
		console.info('moveLeft');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.curFigureActiveId}`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(0 + i);
			let column: number = curBlock.data('column');
			let newBlock: JQuery = $('.block').eq((curBlock.index() - 1));
			if((!newBlock.hasClass(`figure_${this.curFigureActiveId}`) && newBlock.hasClass('figure_block')) || column === 1) return;
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(0 + i);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.settings.maxColumns * row) - 1);
			let isCenter: string = curBlock.attr('center') || null;
			//очистим текущий квадрат и уберем класс 
			curBlock.removeClass(`figure_block figure_${this.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.curFigureActiveId}`).data('type',figureType).data('column',(column - 1)).data('row',(row + 1));
			//если центр фигуры уберем центр и добавим в новый блок и сохраним ротацию
			if(isCenter){
				curBlock.removeAttr('center');
				newBlock.attr('center','true');
				newBlock.attr('rotation',curBlock.attr('rotation'));
				curBlock.removeAttr('rotation');
			}
		}
	}

	public figureRebuild(figureType: string, id: number, idDiff: number, colDiff: number, rowDiff: number): void {
		//квадрат
		let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(id);
		let column: number = curBlock.data('column');
		let row: number = curBlock.data('row') - 1;
		let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.settings.maxColumns * row) + idDiff);

		console.log(newBlock);
		//проверим можно ли сделать поворот
		if((!newBlock.hasClass(`figure_${this.curFigureActiveId}`) && newBlock.hasClass('figure_block')) ) return;
		else {
			//очистим текущий квадрат и уберем класс 
			curBlock.removeClass(`figure_block figure_${this.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.curFigureActiveId}`).data('type',figureType).data('column',(column + colDiff)).data('row',row + rowDiff + 1);
		}		
	}

	public calculateRotation(currentVal: any): string {
		let newVal: number = currentVal * 1 + 90;
		if(newVal === 360) newVal = 0;
		return (newVal + '');
	}

	public rotateFigure(): void {
		console.info('rotate');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.curFigureActiveId}`).data('type');
		//сохраним градус поворота
		let figureCurRotation: any = $(`.figure_${this.curFigureActiveId}[center=true]`).attr('rotation') || '0';

		if(figureType === 'a'){
			if(figureCurRotation === '0'){
				//первый квадрат
				this.figureRebuild(figureType,0,-1,-1,0);
				//второй квадрат
				this.figureRebuild(figureType,3,this.settings.maxColumns,0,1);
			}
			else if(figureCurRotation === '90'){
				//первый квадрат
				this.figureRebuild(figureType,4,this.settings.maxColumns * -1,0,-1);
				//второй квадрат
				this.figureRebuild(figureType,4,-1,-1,0);
			}
			else if(figureCurRotation === '180'){
				//первый квадрат
				this.figureRebuild(figureType,4,1,1,0);
				//второй квадрат
				this.figureRebuild(figureType,1,this.settings.maxColumns * -1,0,-1);
			}
			else if(figureCurRotation === '270'){
				//первый квадрат
				this.figureRebuild(figureType,0,this.settings.maxColumns,0,1);
				//второй квадрат
				this.figureRebuild(figureType,0,1,1,0);
			}
			else {}
		}
		else if(figureType === 'a2'){
			if(figureCurRotation === '0'){
				//первый квадрат
				this.figureRebuild(figureType,0,1,1,0);
				//второй квадрат
				this.figureRebuild(figureType,1,this.settings.maxColumns,0,1);
			}
			else if(figureCurRotation === '90'){
				//первый квадрат
				this.figureRebuild(figureType,3,this.settings.maxColumns * -1,0,-1);
				//второй квадрат
				this.figureRebuild(figureType,4,1,1,0);
			}
			else if(figureCurRotation === '180'){
				//первый квадрат
				this.figureRebuild(figureType,3,this.settings.maxColumns * -1,0,-1);
				//второй квадрат
				this.figureRebuild(figureType,4,-1,-1,0);
			}
			else if(figureCurRotation === '270'){
				//первый квадрат
				this.figureRebuild(figureType,0,-1,-1,0);
				//второй квадрат
				this.figureRebuild(figureType,1,this.settings.maxColumns,0,1);
			}
			else {}
		}
		else if(figureType === 'b'){
			if(figureCurRotation === '0'){
				this.figureRebuild(figureType,0,(this.settings.maxColumns * -2) + 2,2,-2);
				this.figureRebuild(figureType,1,(this.settings.maxColumns * -1) + 1,1,-1);
				this.figureRebuild(figureType,3,this.settings.maxColumns -1,-1,1);
				this.figureRebuild(figureType,3,(this.settings.maxColumns *2) -2,-2,2);
			}
			else if(figureCurRotation === '90'){
				this.figureRebuild(figureType,0,(this.settings.maxColumns * 2) - 2,-2,2);
				this.figureRebuild(figureType,0,this.settings.maxColumns - 1,-1,1);
				this.figureRebuild(figureType,3,(this.settings.maxColumns * -1) +1,1,-1);
				this.figureRebuild(figureType,4,(this.settings.maxColumns * -2) +2,2,-2);
			}
			if(figureCurRotation === '180'){
				this.figureRebuild(figureType,0,(this.settings.maxColumns * -2) + 2,2,-2);
				this.figureRebuild(figureType,1,(this.settings.maxColumns * -1) + 1,1,-1);
				this.figureRebuild(figureType,3,this.settings.maxColumns -1,-1,1);
				this.figureRebuild(figureType,3,(this.settings.maxColumns *2) -2,-2,2);
			}
			else if(figureCurRotation === '270'){
				this.figureRebuild(figureType,0,(this.settings.maxColumns * 2) - 2,-2,2);
				this.figureRebuild(figureType,0,this.settings.maxColumns - 1,-1,1);
				this.figureRebuild(figureType,3,(this.settings.maxColumns * -1) +1,1,-1);
				this.figureRebuild(figureType,4,(this.settings.maxColumns * -2) +2,2,-2);
			}
			else {}
		}
		else {}		
		//установим инфу по ротации
		$(`.figure_${this.curFigureActiveId}[center=true]`).attr('rotation',this.calculateRotation(figureCurRotation));
	}
}

declare var window: any;