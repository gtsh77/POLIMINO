import { Injectable } from '@angular/core';

@Injectable()

export class f_cr {
	public figure(type: string): string {
		//создадим уникальный id
		let hash: string = chance.hash({length: 8});
		//объявим фигуру активной
		if(type === 'a'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(6).addClass(`figure_block figure_${hash}`).data('type','a').data('row',1).data('column',7);
			$('.block').eq(16).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',5);
			$('.block').eq(17).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',6);
			$('.block').eq(18).addClass(`figure_block figure_${hash}`).data('type','a').data('row',2).data('column',7);
			$('.block').eq(29).addClass(`figure_block figure_${hash}`).data('type','a').data('row',3).data('column',6);
			//установим центр
			$('.block').eq(17).attr('center','true');
			$('.block').eq(17).attr('limit','0');

		}
		else if(type === 'a2'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',1).data('column',5);
			$('.block').eq(16).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',5);
			$('.block').eq(17).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',6);
			$('.block').eq(18).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',2).data('column',7);
			$('.block').eq(29).addClass(`figure_block figure_${hash}`).data('type','a2').data('row',3).data('column',5);
			//установим центр
			$('.block').eq(17).attr('center','true');
			$('.block').eq(17).attr('limit','0');
		}
		else if(type === 'b'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(3).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',4);
			$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',5);
			$('.block').eq(5).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',6);
			$('.block').eq(6).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',7);
			$('.block').eq(7).addClass(`figure_block figure_${hash}`).data('type','b').data('row',1).data('column',8);
			//установим центр
			$('.block').eq(5).attr('center','true');
			$('.block').eq(5).attr('limit','2');
		}		
		else if(type === 'c'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',5);
			$('.block').eq(5).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',6);
			$('.block').eq(6).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',7);
			$('.block').eq(7).addClass(`figure_block figure_${hash}`).data('type','c').data('row',1).data('column',8);
			$('.block').eq(19).addClass(`figure_block figure_${hash}`).data('type','c').data('row',2).data('column',8);
			$('.block').eq(5).attr('center','true');
			$('.block').eq(5).attr('limit','2');			
		}
		else if(type === 'c2'){
			//стартовая позиция, зададим клеткам ид сущности, тип фигуры и номер строки
			$('.block').eq(4).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',5);
			$('.block').eq(5).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',6);
			$('.block').eq(6).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',7);
			$('.block').eq(7).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',1).data('column',8);
			$('.block').eq(16).addClass(`figure_block figure_${hash}`).data('type','c2').data('row',2).data('column',5);
			$('.block').eq(6).attr('center','true');
			$('.block').eq(6).attr('limit','2');
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
			$('.block').eq(5).addClass(`figure_block figure_${hash}`).data('type','l').data('row',1).data('column',6);
			$('.block').eq(16).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',5);
			$('.block').eq(17).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',6);
			$('.block').eq(18).addClass(`figure_block figure_${hash}`).data('type','l').data('row',2).data('column',7);
			$('.block').eq(29).addClass(`figure_block figure_${hash}`).data('type','l').data('row',3).data('column',6);
			$('.block').eq(17).attr('center','true');
			$('.block').eq(17).attr('limit','0');					
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
		return hash;
	}
}