import { Injectable } from '@angular/core';

interface ISettings {
	maxRows: number;
	maxColumns: number;
}

@Injectable()

export class s_gl {
	public curFigureActiveId: string = null;
	public isNewFigure: boolean = false;
	public settings: ISettings = {
		'maxRows': 24,
		'maxColumns': 12
	}
	public rcFigures: string[] = ['a','a2','c','c2','l','d','d2'];
	public bag: string[] = [];	
	public move: any = null;
	public speed: number = 750;
	public downKickTimer: any = null;
}