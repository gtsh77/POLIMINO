import { Component, OnInit } from '@angular/core';
import { f_mv } from './f_mv.c';
import { f_tr } from './f_tr.c';

@Component({
	templateUrl: 'app/templates/main.html',
	styleUrls: ['app/templates/main.css']
})

export class MainComponent {
	constructor(private f_mv: f_mv, private f_tr: f_tr){}
	public ngOnInit(): void {
		window.scope = this;
		window.this = this;
		//this.f_mv.next();
	}

	public f_controls(direction: string): void {
		if(direction === 'left') this.f_mv.left();
		else if(direction === 'right') this.f_mv.right();
		else if(direction === 'transform') this.f_tr.rotate();
		else return;
	}
}

declare var window: any;