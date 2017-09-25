import { Component, OnInit } from '@angular/core';

@Component({
	templateUrl: 'app/templates/main.html',
	styleUrls: ['app/templates/main.css']
})

export class MainBaseComponent {

	public ngOnInit(): void {
		this.setFigure1();
	}

	public setFigure1(): void {
		//стартовая позиция, зададим клеткам ид сущности и тип фигуры
		$('.main').find('td').eq(0).css('background','#000').addClass('figure-1').attr('type','1');
		$('.main').find('td').eq(1).css('background','#000').addClass('figure-1').attr('type','1');
		$('.main').find('td').eq(2).css('background','#000').addClass('figure-1').attr('type','1');
		$('.main').find('td').eq(3).css('background','#000').addClass('figure-1').attr('type','1');
		$('.main').find('td').eq(4).css('background','#000').addClass('figure-1').attr('type','1');
	}
}