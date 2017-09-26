import { Component, OnInit } from '@angular/core';

@Component({
	templateUrl: 'app/templates/main.html',
	styleUrls: ['app/templates/main.css']
})

export class MainBaseComponent {

	private curFigureActiveId: string = null;
	private settings: any = {
		'maxRows': 20,
		'maxColumns': 12
	}
	private move: any = null;

	public ngOnInit(): void {
		window.scope = this;
		this.setFigure1();
		this.move = setInterval(() => {
			this.moveFigure();
		},500);
	}

	public setFigure1(): void {
		//создадим уникальный id
		let hash: string = chance.hash({length: 8});
		//объявим фигуру активной
		this.curFigureActiveId = hash;
		//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
		$('.block').eq(0).addClass(`figure_block figure_${hash}`).data('type',1).data('row',1);
		$('.block').eq(1).addClass(`figure_block figure_${hash}`).data('type',1).data('row',1);
		$('.block').eq(2).addClass(`figure_block figure_${hash}`).data('type',1).data('row',1);
		$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type',1).data('row',1);
		$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type',1).data('row',1);		
	}

	public moveFigure(): void {
		console.info('move');
		//сохраним тип фигуры
		let figureType: number = $(`.figure_${this.curFigureActiveId}`).data('type');		
		;

		if(figureType === 1){
			//'передвинем' фигуру по частям по очереди начиная с конца
			for(let i:number = 0; i < 5; i++){

				//определим следующий квадрат под закраску под фигуру
				let curBlock: JQuery = $(`.figure_${this.curFigureActiveId}`).eq(4 - i);
				let row: number = curBlock.data('row');
				let newBlock: JQuery = $('.block').eq((curBlock.index() + (12 * row)));

				//определим используется ли он и не конец ли поля
				if((!newBlock.hasClass('figure_block')) && row < this.settings.maxRows){
					//очистим текущий квадрат и уберем класс
					curBlock.removeClass(`figure_block figure_${this.curFigureActiveId}`);
					//покрасим новый квадрат и добавим класс
					newBlock.addClass(`figure_block figure_${this.curFigureActiveId}`).data('type',1).data('row',(row + 1));
					
				}
				else {
					clearInterval(this.move);
					this.move = null;
					return;
				}

				
			}

		}
		else {}


	}
}

declare var window: any;