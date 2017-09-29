import { Component, OnInit, HostListener } from '@angular/core';
import { f_cr } from './f_cr.c';
import { s_gl } from './s_gl.c';


@Component({
	templateUrl: 'app/templates/main.html',
	styleUrls: ['app/templates/main.css']
})

export class MainComponent {

	constructor(private scope: s_gl, private f_cr: f_cr){}

	public ngOnInit(): void {
		window.scope = this;
		window.this = this;
		//this.createNextFigure();
	}

	// public createPlayField(): void {
	// 	let elTbody: Element = document.querySelector('.field');
	// 	for(let j: number = 0; j < this.scope.settings.maxColumns; j++){
	// 		let elTr: Element = document.createElement('tr');			
	// 		for(let i: number = 0; i < this.scope.settings.maxColumns; i++){
	// 			let elTd: Element = document.createElement('td');
	// 			elTd.classList.add('block');
	// 			elTr.appendChild(elTd);
	// 		}
	// 		elTbody.appendChild(elTr);
	// 	}	
	// }



	public createNextFigure(): void {
		if(!this.scope.bag.length) this.generateBag();
		this.scope.curFigureActiveId = this.f_cr.figure(this.scope.bag[0]);
		this.scope.move = setInterval(() => {
			this.moveFigure();
		},this.scope.speed);
		this.scope.bag.shift();
	}	

	public generateBag(): void {
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



	// public createFigure(type: string): any {
	// 	//создадим уникальный id
	// 	let hash: string = chance.hash({length: 8});
	// 	//объявим фигуру активной
	// 	this.scope.curFigureActiveId = hash;
	// 	if(type === 'a'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(6).addClass(`figure_block figure_${hash}`).data('type','a').data('row',1).data('column',7);
	// 		$('.block').eq(16).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',5);
	// 		$('.block').eq(17).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',6);
	// 		$('.block').eq(18).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',7);
	// 		$('.block').eq(29).addClass(`figure_block figure_${hash}`).data('type','a').data('row',3).data('column',6);
	// 		//установим центр
	// 		$('.block').eq(17).attr('center','true');
	// 		$('.block').eq(17).attr('limit','0');

	// 	}
	// 	else if(type === 'a2'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',1).data('column',5);
	// 		$('.block').eq(16).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',5);
	// 		$('.block').eq(17).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',6);
	// 		$('.block').eq(18).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',7);
	// 		$('.block').eq(29).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',3).data('column',5);
	// 		//установим центр
	// 		$('.block').eq(17).attr('center','true');
	// 		$('.block').eq(17).attr('limit','0');
	// 	}
	// 	else if(type === 'b'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',4);
	// 		$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',5);
	// 		$('.block').eq(5).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',6);
	// 		$('.block').eq(6).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',7);
	// 		$('.block').eq(7).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',8);
	// 		//установим центр
	// 		$('.block').eq(5).attr('center','true');
	// 		$('.block').eq(5).attr('limit','2');
	// 	}		
	// 	else if(type === 'c'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',5);
	// 		$('.block').eq(5).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',6);
	// 		$('.block').eq(6).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',7);
	// 		$('.block').eq(7).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',8);
	// 		$('.block').eq(19).addClass(`figure_block figure_${hash}`).data('type','c').data('row',2).data('column',8);
	// 		$('.block').eq(5).attr('center','true');
	// 		$('.block').eq(5).attr('limit','2');			
	// 	}
	// 	else if(type === 'c2'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',5);
	// 		$('.block').eq(5).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',6);
	// 		$('.block').eq(6).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',7);
	// 		$('.block').eq(7).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',8);
	// 		$('.block').eq(16).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',2).data('column',5);
	// 		$('.block').eq(6).attr('center','true');
	// 		$('.block').eq(6).attr('limit','2');
	// 	}
	// 	else if(type === 'd'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','d').data('row',1).data('column',1);
	// 		$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','d').data('row',1).data('column',2);
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','d').data('row',1).data('column',3);
	// 		$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','d').data('row',2).data('column',3);
	// 		$('.block').eq(15).addClass(`figure_block figure_${hash}`).data('type','d').data('row',2).data('column',4);	
	// 	}
	// 	else if(type === 'd2'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',1).data('column',2);
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',1).data('column',3);
	// 		$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',1).data('column',4);
	// 		$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',2).data('column',1);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','d2').data('row',2).data('column',2);	
	// 	}
	// 	else if(type === 'e'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','e').data('row',1).data('column',1);
	// 		$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','e').data('row',1).data('column',2);
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','e').data('row',1).data('column',3);
	// 		$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','e').data('row',2).data('column',1);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','e').data('row',2).data('column',2);		
	// 	}
	// 	else if(type === 'e2'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',1).data('column',1);
	// 		$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',1).data('column',2);
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',1).data('column',3);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',2).data('column',2);
	// 		$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','e2').data('row',2).data('column',3);		
	// 	}
	// 	else if(type === 'f'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1).data('column',1);
	// 		$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1).data('column',2);
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1).data('column',3);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','f').data('row',2).data('column',2);
	// 		$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','f').data('row',3).data('column',2);		
	// 	}
	// 	else if(type === 'g'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','g').data('row',1).data('column',1);
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','g').data('row',1).data('column',3);
	// 		$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','g').data('row',2).data('column',1);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','g').data('row',2).data('column',2);
	// 		$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','g').data('row',2).data('column',3);		
	// 	}
	// 	else if(type === 'h'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','g').data('row',1).data('column',1);
	// 		$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','g').data('row',2).data('column',1);
	// 		$('.block').eq(24).addClass(`figure_block figure_${hash}`).data('type','g').data('row',3).data('column',1);
	// 		$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','g').data('row',3).data('column',2);
	// 		$('.block').eq(26).addClass(`figure_block figure_${hash}`).data('type','g').data('row',3).data('column',3);		
	// 	}
	// 	else if(type === 'k'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','k').data('row',1).data('column',1);
	// 		$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','k').data('row',2).data('column',1);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','k').data('row',2).data('column',2);
	// 		$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','k').data('row',3).data('column',2);
	// 		$('.block').eq(26).addClass(`figure_block figure_${hash}`).data('type','k').data('row',3).data('column',3);		
	// 	}
	// 	else if(type === 'l'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(5).addClass(`figure_block figure_${hash}`).data('type','l').data('row',1).data('column',6);
	// 		$('.block').eq(16).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',5);
	// 		$('.block').eq(17).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',6);
	// 		$('.block').eq(18).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',7);
	// 		$('.block').eq(29).addClass(`figure_block figure_${hash}`).data('type','l').data('row',3).data('column',6);
	// 		$('.block').eq(17).attr('center','true');
	// 		$('.block').eq(17).attr('limit','0');					
	// 	}
	// 	else if(type === 'm'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','m').data('row',1).data('column',1);
	// 		$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','m').data('row',1).data('column',2);
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','m').data('row',1).data('column',3);
	// 		$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','m').data('row',1).data('column',4);
	// 		$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','m').data('row',2).data('column',3);		
	// 	}
	// 	else if(type === 'm2'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',1).data('column',1);
	// 		$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',1).data('column',2);
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',1).data('column',3);
	// 		$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',1).data('column',4);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','m2').data('row',2).data('column',2);		
	// 	}
	// 	else if(type === 'n'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','n').data('row',1).data('column',1);
	// 		$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','n').data('row',2).data('column',1);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','n').data('row',2).data('column',2);
	// 		$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','n').data('row',2).data('column',3);
	// 		$('.block').eq(26).addClass(`figure_block figure_${hash}`).data('type','n').data('row',3).data('column',3);		
	// 	}
	// 	else if(type === 'n2'){
	// 		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
	// 		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',1).data('column',3);
	// 		$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',2).data('column',1);
	// 		$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',2).data('column',2);
	// 		$('.block').eq(14).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',2).data('column',3);
	// 		$('.block').eq(24).addClass(`figure_block figure_${hash}`).data('type','n2').data('row',3).data('column',1);		
	// 	}
	// 	else {}
	// 		// this.moveFigure();
	// 		// this.moveFigure();
	// 	return setInterval(() => {
	// 		this.moveFigure();
	// 	},this.scope.speed);
	// }

	public moveFigure(): void {
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
				this.createNextFigure();
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

	public f_controls(direction: string): void {
		if(direction === 'left') this.moveFigureLeft();
		else if(direction === 'right') this.moveFigureRight();
		else if(direction === 'transform') this.rotateFigure();
		else return;
	}

	public moveFigureRight(): void {
		console.info('moveRight');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.scope.curFigureActiveId}`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(4 - i);
			let column: number = curBlock.data('column');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + 1));
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

	public moveFigureLeft(): void {
		console.info('moveLeft');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.scope.curFigureActiveId}`).data('type');
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(0 + i);
			let column: number = curBlock.data('column');
			let newBlock: JQuery = $('.block').eq((curBlock.index() - 1));
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

	public figureRebuild(figureType: string, id: number, idDiff: number, colDiff: number, rowDiff: number): void {
		//квадрат
		let curBlock: JQuery = $(`.figure_${this.scope.curFigureActiveId}`).eq(id);
		let column: number = curBlock.data('column');
		let row: number = curBlock.data('row') - 1;
		let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.scope.settings.maxColumns * row) + idDiff);

		console.log(newBlock);
		//проверим можно ли сделать поворот
		//if((!newBlock.hasClass(`figure_${this.scope.curFigureActiveId}`) && newBlock.hasClass('figure_block')) ) return;
		//else {
			//очистим текущий квадрат и уберем класс 
			curBlock.removeClass(`figure_block figure_${this.scope.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.scope.curFigureActiveId}`).data('type',figureType).data('column',(column + colDiff)).data('row',row + rowDiff + 1);
		//}		
	}

	public calculateRotation(currentVal: any): string {
		let newVal: number = currentVal * 1 + 90;
		if(newVal === 360) newVal = 0;
		return (newVal + '');
	}

	public rotateFigure(): void {
		console.info('rotate');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.scope.curFigureActiveId}`).data('type');
		//сохраним градус поворота
		let degree: any = $(`.figure_${this.scope.curFigureActiveId}[center=true]`).attr('rotation') || '0';
		let limit: any = $(`.figure_${this.scope.curFigureActiveId}[center=true]`).attr('limit');
		let centersIndex: any = $(`.figure_${this.scope.curFigureActiveId}[center=true]`).index() +1;
		let centersRow: any = $(`.figure_${this.scope.curFigureActiveId}[center=true]`).data('row');

		//если слишком близко к границам поля, то отменим поворот
		if(centersIndex <= limit || centersIndex > (this.scope.settings.maxColumns - limit) || centersRow <= limit || centersRow > (this.scope.settings.maxRows - limit) ) return;

		//для каждего типа свой алгоритм перерисовки блоков
		if(figureType === 'a'){
			if(degree === '0'){
				//первый квадрат
				this.figureRebuild(figureType,0,-1,-1,0);
				//второй квадрат
				this.figureRebuild(figureType,3,this.scope.settings.maxColumns,0,1);
			}
			else if(degree === '90'){
				//первый квадрат
				this.figureRebuild(figureType,4,this.scope.settings.maxColumns * -1,0,-1);
				//второй квадрат
				this.figureRebuild(figureType,4,-1,-1,0);
			}
			else if(degree === '180'){
				//первый квадрат
				this.figureRebuild(figureType,4,1,1,0);
				//второй квадрат
				this.figureRebuild(figureType,1,this.scope.settings.maxColumns * -1,0,-1);
			}
			else if(degree === '270'){
				//первый квадрат
				this.figureRebuild(figureType,0,this.scope.settings.maxColumns,0,1);
				//второй квадрат
				this.figureRebuild(figureType,0,1,1,0);
			}
			else {}
		}
		else if(figureType === 'a2'){
			if(degree === '0'){
				//первый квадрат
				this.figureRebuild(figureType,0,1,1,0);
				//второй квадрат
				this.figureRebuild(figureType,1,this.scope.settings.maxColumns,0,1);
			}
			else if(degree === '90'){
				//первый квадрат
				this.figureRebuild(figureType,3,this.scope.settings.maxColumns * -1,0,-1);
				//второй квадрат
				this.figureRebuild(figureType,4,1,1,0);
			}
			else if(degree === '180'){
				//первый квадрат
				this.figureRebuild(figureType,3,this.scope.settings.maxColumns * -1,0,-1);
				//второй квадрат
				this.figureRebuild(figureType,4,-1,-1,0);
			}
			else if(degree === '270'){
				//первый квадрат
				this.figureRebuild(figureType,0,-1,-1,0);
				//второй квадрат
				this.figureRebuild(figureType,1,this.scope.settings.maxColumns,0,1);
			}
			else {}
		}
		else if(figureType === 'b'){
			if(degree === '0'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * -2) + 2,2,-2);
				this.figureRebuild(figureType,1,(this.scope.settings.maxColumns * -1) + 1,1,-1);
				this.figureRebuild(figureType,3,this.scope.settings.maxColumns -1,-1,1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns *2) -2,-2,2);
			}
			else if(degree === '90'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 2) - 2,-2,2);
				this.figureRebuild(figureType,0,this.scope.settings.maxColumns - 1,-1,1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * -1) +1,1,-1);
				this.figureRebuild(figureType,4,(this.scope.settings.maxColumns * -2) +2,2,-2);
			}
			if(degree === '180'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * -2) + 2,2,-2);
				this.figureRebuild(figureType,1,(this.scope.settings.maxColumns * -1) + 1,1,-1);
				this.figureRebuild(figureType,3,this.scope.settings.maxColumns -1,-1,1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns *2) -2,-2,2);
			}
			else if(degree === '270'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 2) - 2,-2,2);
				this.figureRebuild(figureType,0,this.scope.settings.maxColumns - 1,-1,1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * -1) +1,1,-1);
				this.figureRebuild(figureType,4,(this.scope.settings.maxColumns * -2) +2,2,-2);
			}
			else {}
		}
		else if(figureType === 'c'){
			if(degree === '0'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * -1) + 1,+1,-1);
				this.figureRebuild(figureType,2,(this.scope.settings.maxColumns * 1) - 1,-1,+1);
				this.figureRebuild(figureType,2,(this.scope.settings.maxColumns * 2) -2,-2,+2);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * 1) -3,-3,+1);
			}
			else if(degree === '90'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 1) + 1,+1,+1);
				this.figureRebuild(figureType,2,(this.scope.settings.maxColumns * -1) - 1,-1,-1);
				this.figureRebuild(figureType,4,(this.scope.settings.maxColumns * -2) -2,-2,-2);
				this.figureRebuild(figureType,4,(this.scope.settings.maxColumns * -3) -1,-1,-3);
			}
			else if(degree === '180'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * -1) + 3,+3,-1);
				this.figureRebuild(figureType,1,(this.scope.settings.maxColumns * -2) + 2,+2,-2);
				this.figureRebuild(figureType,2,(this.scope.settings.maxColumns * -1) +1,+1,-1);
				this.figureRebuild(figureType,4,(this.scope.settings.maxColumns * 1) -1,-1,+1);
			}
			else if(degree === '270'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 3) + 2,+2,+3);
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 2) + 1,+1,+2);
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 1) + 1,+1,+1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * -1) -1,-1,-1);
			}
			else {}
		}
		else if(figureType === 'c2'){
			if(degree === '0'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * -2) + 2,+2,-2);
				this.figureRebuild(figureType,1,(this.scope.settings.maxColumns * -1) +1,+1,-1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * 1) -1,-1,+1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * -3) +1,+1,-3);
			}
			else if(degree === '90'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 1) + 3,+3,+1);
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 2) +2,+2,+2);
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 1) +1,+1,+1);
				this.figureRebuild(figureType,4,(this.scope.settings.maxColumns * -1) -1,-1,-1);
			}
			else if(degree === '180'){
				this.figureRebuild(figureType,1,(this.scope.settings.maxColumns * -1) + 1,+1,-1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * 1) - 1,-1,+1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * 2) -2,-2,+2);
				this.figureRebuild(figureType,1,(this.scope.settings.maxColumns * 3) -1,-1,+3);
			}
			else if(degree === '270'){
				this.figureRebuild(figureType,0,(this.scope.settings.maxColumns * 1) + 1,+1,+1);
				this.figureRebuild(figureType,2,(this.scope.settings.maxColumns * -1) - 1,-1,-1);
				this.figureRebuild(figureType,3,(this.scope.settings.maxColumns * -2) - 2,-2,-2);
				this.figureRebuild(figureType,4,(this.scope.settings.maxColumns * -1) -3,-3,-1);
			}
			else {}
		}
		else if(figureType === 'l') return;
		else {}		
		//установим инфу по ротации
		$(`.figure_${this.scope.curFigureActiveId}[center=true]`).attr('rotation',this.calculateRotation(degree));
	}
}

declare var window: any;