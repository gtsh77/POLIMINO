import { Injectable } from '@angular/core';
import { s_gl } from './s_gl.c';

interface rebuild_args {
	f_type: string;
	id: number;
	id_diff: number;
	col_diff: number; 
	row_diff: number;
	skip_chk_step?: boolean;
}

@Injectable()

export class f_tr {
	constructor(private scope: s_gl){}
	public rebuild(data: rebuild_args[]): void {
		let degree: any = $(`[figure=${this.scope.curFigureActiveId}][center=true]`).attr('rotation') || '0';
		//полная проверка перед перерисовкой первого блока
		for(let i: number = 0; i < data.length; i++){
			if(data[i].skip_chk_step) continue;
			let curBlock: JQuery = $(`[figure=${this.scope.curFigureActiveId}]`).eq(data[i].id);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.scope.settings.maxColumns * row) + data[i].id_diff);
			if(newBlock.attr(`figure`) !== this.scope.curFigureActiveId && newBlock.hasClass('figure_block')){
				console.warn('cant_rotate (figure)');
				return;
			}
		}
		for(let j: number = 0; j < data.length; j++){
			let curBlock: JQuery = $(`[figure=${this.scope.curFigureActiveId}]`).eq(data[j].id);
			let column: number = curBlock.data('column');
			let row: number = curBlock.data('row') - 1;
			let newBlock: JQuery = $('.block').eq(curBlock.index() + (this.scope.settings.maxColumns * row) + data[j].id_diff);
			console.log(newBlock[0]);
			curBlock.removeClass(`figure_block`);
			curBlock.removeAttr('figure');
			//покрасим новый квадрат и добавим класс
			newBlock.addClass(`figure_block`).data('type',data[j].f_type).data('column',(column + data[j].col_diff)).data('row',row + data[j].row_diff + 1).attr('figure',`${this.scope.curFigureActiveId}`);
		}
		//установим инфу по ротации
		$(`[figure=${this.scope.curFigureActiveId}][center=true]`).attr('rotation',this.getNewRVal(degree));
		console.info('rotated');
	
	}

	public rotate(): void {
		//сохраним тип фигуры
		let figureType: string = $(`[figure=${this.scope.curFigureActiveId}]`).data('type');
		//сохраним градус поворота
		let degree: any = $(`[figure=${this.scope.curFigureActiveId}][center=true]`).attr('rotation') || '0';
		let limit: any = $(`[figure=${this.scope.curFigureActiveId}][center=true]`).attr('limit');
		let centersIndex: any = $(`[figure=${this.scope.curFigureActiveId}][center=true]`).index() +1;
		let centersRow: any = $(`[figure=${this.scope.curFigureActiveId}][center=true]`).data('row');

		//если слишком близко к границам поля, то отменим поворот
		if(centersIndex <= limit || centersIndex > (this.scope.settings.maxColumns - limit) || centersRow <= limit || centersRow > (this.scope.settings.maxRows - limit) ){
			console.warn('cant_rotate (limit)');
			return;
		}

		//для каждего типа свой алгоритм перерисовки блоков
		if(figureType === 'a'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: -1,
						col_diff: -1,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: this.scope.settings.maxColumns,
						col_diff: 0,
						row_diff: +1
					}
				]);
			}

			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 4,
						id_diff: this.scope.settings.maxColumns * -1,
						col_diff: 0,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: -1,
						col_diff: -1,
						row_diff: 0
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 4,
						id_diff: 1,
						col_diff: 1,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: this.scope.settings.maxColumns * -1,
						col_diff: 0,
						row_diff: -1
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: this.scope.settings.maxColumns,
						col_diff: 0,
						row_diff: 1
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: 1,
						col_diff: 1,
						row_diff: 0
					}
				]);
			}
			else {}
		}
		else if(figureType === 'a2'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: 1,
						col_diff: 1,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: this.scope.settings.maxColumns,
						col_diff: 0,
						row_diff: 1
					}
				]);				
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 3,
						id_diff: this.scope.settings.maxColumns * -1,
						col_diff: 0,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: 1,
						col_diff: 1,
						row_diff: 0
					}
				]);				
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 3,
						id_diff: this.scope.settings.maxColumns * -1,
						col_diff: 0,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: -1,
						col_diff: -1,
						row_diff: 0
					}
				]);				
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: -1,
						col_diff: -1,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: this.scope.settings.maxColumns,
						col_diff: 0,
						row_diff: 1
					}
				]);				
			}
			else {}
		}
		else if(figureType === 'b'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * -2) + 2,
						col_diff: +2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns - 1),
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 2) - 2,
						col_diff: -2,
						row_diff: +2
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2) - 2,
						col_diff: -2,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns - 1),
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -2) + 2,
						col_diff: +2,
						row_diff: -2
					}
				]);
			}
			if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * -2) + 2,
						col_diff: +2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns - 1),
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 2) - 2,
						col_diff: -2,
						row_diff: +2
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2) - 2,
						col_diff: -2,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns - 1),
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -2) + 2,
						col_diff: +2,
						row_diff: -2
					}
				]);
			}
			else {}
		}
		else if(figureType === 'c'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * 2) - 2,
						col_diff: -2,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 3,
						col_diff: -3,
						row_diff: +1
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -2) - 2,
						col_diff: -2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -3) - 1,
						col_diff: -1,
						row_diff: -3
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * - 1) + 3,
						col_diff: +3,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -2) + 2,
						col_diff: +2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 3) + 2,
						col_diff: +2,
						row_diff: +3
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2) + 1,
						col_diff: +1,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					}
				]);
			}
			else {}
		}
		else if(figureType === 'c2'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * -2) + 2,
						col_diff: +2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -3) + 1,
						col_diff: +1,
						row_diff: -3
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 3,
						col_diff: +3,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2) + 2,
						col_diff: +2,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 2) - 2,
						col_diff: -2,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * 3) - 1,
						col_diff: -1,
						row_diff: +3
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -2) - 2,
						col_diff: -2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -1) - 3,
						col_diff: -3,
						row_diff: -1
					}
				]);
			}
			else {}
		}
		else if(figureType === 'l') return;
		else if(figureType === 'd'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * -2) + 2,
						col_diff: +2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						skip_chk_step: true,
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: - 2,
						col_diff: -2,
						row_diff: 0
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2) + 2,
						col_diff: +2,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						skip_chk_step: true,
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -2),
						col_diff: 0,
						row_diff: -2
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * 2) -2,
						col_diff: -2,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						skip_chk_step: true,
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: +2,
						col_diff: +2,
						row_diff: 0
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -2) - 2,
						col_diff: -2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					},
					{
						skip_chk_step: true,
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2),
						col_diff: 0,
						row_diff: +2
					}
				]);
			}
			else {}
		}	
		else if(figureType === 'd2'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -2),
						col_diff: 0,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					},
					{
						skip_chk_step: true,
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 2) - 2,
						col_diff: -2,
						row_diff: +2
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: +2,
						col_diff: +2,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						skip_chk_step: true,
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -2) - 2,
						col_diff: -2,
						row_diff: -2
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * 2),
						col_diff: 0,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						skip_chk_step: true,
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * -2) + 2,
						col_diff: +2,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 4,
						id_diff: -2,
						col_diff: -2,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						skip_chk_step: true,
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2) + 2,
						col_diff: +2,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					}
				]);
			}
			else {}
		}
		else if(figureType === 'e'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff:  (this.scope.settings.maxColumns * -2),
						col_diff: 0,
						row_diff: -2
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: + 2,
						col_diff: +2,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * 2),
						col_diff: 0,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: - 2,
						col_diff: -2,
						row_diff: 0
					}
				]);
			}
			else {}
		}
		else if(figureType === 'e2'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff:  - 2,
						col_diff: -2,
						row_diff: 0
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -2),
						col_diff: 0,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: + 2,
						col_diff: +2,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2),
						col_diff: 0,
						row_diff: +2
					}
				]);
			}
			else {}
		}	
		else if(figureType === 'n'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: + 2,
						col_diff: +2,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: - 2,
						col_diff: -2,
						row_diff: 0
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * 2),
						col_diff: 0,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * -2),
						col_diff: 0,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: + 2,
						col_diff: +2,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: - 2,
						col_diff: -2,
						row_diff: 0
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * 2),
						col_diff: 0,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) + 1,
						col_diff: +1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 2,
						id_diff: (this.scope.settings.maxColumns * -2),
						col_diff: 0,
						row_diff: -2
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) - 1,
						col_diff: -1,
						row_diff: -1
					}
				]);
			}
			else {}
		}	
		else if(figureType === 'n2'){
			if(degree === '0'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: - 2,
						col_diff: -2,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: + 2,
						col_diff: +2,
						row_diff: 0
					}
				]);
			}
			else if(degree === '90'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2),
						col_diff: 0,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -2),
						col_diff: 0,
						row_diff: -2
					}
				]);
			}
			else if(degree === '180'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: - 2,
						col_diff: -2,
						row_diff: 0
					},
					{
						f_type: figureType,
						id: 1,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: + 2,
						col_diff: +2,
						row_diff: 0
					}
				]);
			}
			else if(degree === '270'){
				this.rebuild([
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 2),
						col_diff: 0,
						row_diff: +2
					},
					{
						f_type: figureType,
						id: 0,
						id_diff: (this.scope.settings.maxColumns * 1) - 1,
						col_diff: -1,
						row_diff: +1
					},
					{
						f_type: figureType,
						id: 3,
						id_diff: (this.scope.settings.maxColumns * -1) + 1,
						col_diff: +1,
						row_diff: -1
					},
					{
						f_type: figureType,
						id: 4,
						id_diff: (this.scope.settings.maxColumns * -2),
						col_diff: 0,
						row_diff: -2
					}
				]);
			}
			else {}
		}
	
		else {}
	}

	public getNewRVal(currentVal: any): string {
		let newVal: number = currentVal * 1 + 90;
		if(newVal === 360) newVal = 0;
		return (newVal + '');
	}	
}