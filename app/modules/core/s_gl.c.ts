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
	public rcFigures: string[] = ['a','a2','b','c','c2','d','d2','e','e2','n','n2','m','m2','l','h','f','k','g'];
	public bag: string[] = [];	
	public move: any = null;
	public speed: number = 1000;
	public downKickTimer: any = null;
}