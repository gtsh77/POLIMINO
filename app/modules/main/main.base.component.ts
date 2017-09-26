import { Component, OnInit } from '@angular/core';

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
		'maxRows': 25,
		'maxColumns': 12
	}
	private move: any = null;

	public ngOnInit(): void {
		window.scope = this;
		this.move = this.createFigure('F');
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
		if(type === 'I'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','i').data('row',1);
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','i').data('row',1);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','i').data('row',1);
			$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','i').data('row',1);
			$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','i').data('row',1);			
		}
		else if(type === 'F'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1);
			$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','f').data('row',2);
			$('.block').eq(13).addClass(`figure_block figure_${hash}`).data('type','f').data('row',2);
			$('.block').eq(25).addClass(`figure_block figure_${hash}`).data('type','f').data('row',3);			
		}
		else if(type === 'L'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type','f').data('row',1);
			$('.block').eq(12).addClass(`figure_block figure_${hash}`).data('type','f').data('row',2);
			$('.block').eq(24).addClass(`figure_block figure_${hash}`).data('type','f').data('row',3);
			$('.block').eq(36).addClass(`figure_block figure_${hash}`).data('type','f').data('row',4);
			$('.block').eq(37).addClass(`figure_block figure_${hash}`).data('type','f').data('row',4);			
		}
		else {}
		return setInterval(() => {
			this.moveFigure();
		},250);
	}

	public moveFigure(): void {
		console.info('move');
		//сохраним тип фигуры
		let figureType: string = $(`.figure_${this.curFigureActiveId}`).data('type');		
		;
		//проверка можно ли сделать движение по всем частям фигуры
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(4 - i);
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.settings.maxColumns * row)));
			if((!newBlock.hasClass(`figure_${this.curFigureActiveId}`) && newBlock.hasClass('figure_block')) || row === this.settings.maxRows){
				clearInterval(this.move);
				this.move = null;
				return;
			}
		}
		//'передвинем' фигуру по частям по очереди начиная с конца
		for(let i:number = 0; i < 5; i++){
			let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(4 - i);
			let row: number = curBlock.data('row');
			let newBlock: JQuery = $('.block').eq((curBlock.index() + (this.settings.maxColumns * row)));
			//очистим текущий квадрат и уберем класс
			curBlock.removeClass(`figure_block figure_${this.curFigureActiveId}`);
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block figure_${this.curFigureActiveId}`).data('type',figureType).data('row',(row + 1));	
		}
	}
}

declare var window: any;