import { Injectable } from '@angular/core';

interface ISettings {
	maxRows: number;
	maxColumns: number;
}

@Injectable()

export class s_gl {
	constructor(){
		for(let i: number = 0; i < this.settings.maxRows; i++){
			this.rows.push(0);
		}
		for(let i: number = 0; i < this.settings.maxColumns; i++){
			this.cols.push(0);
		}
	}
	private cols: number[] = [];
	private rows: number[] = [];
	public linesStriked: number = 0;
	public level: number = 0;
	public curFigureActiveId: string = null;
	public isNewFigure: boolean = false;
	public settings: ISettings = {
		'maxRows': 24,
		'maxColumns': 12
	}
	public rcFigures: string[] = ['a','a2','b','c','c2','d','d2','e','e2','n','n2','m','m2','l','h','f','k','g'];
	//public rcFigures: string[] = ['a','a2','b'];
	public bag: string[] = [];
	public move: any = null;
	public speed: number = 1000;
	public downKickTimer: any = null;
	public isInited: boolean = false;
}