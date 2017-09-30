import { Component, OnInit } from '@angular/core';
import { f_ctrl } from './f_ctrl.c';
import { f_mv } from './f_mv.c';

@Component({
	templateUrl: 'app/templates/main.html',
	styleUrls: ['app/templates/main.css']
})

export class MainComponent {
	constructor(private f_mv: f_mv, private f_ctrl: f_ctrl){}
	public ngOnInit(): void {
		window.scope = this;
		window.this = this;
		//this.f_mv.next();
	}
}

declare var window: any;