import { Component, AfterViewInit } from '@angular/core';
import { f_ctrl } from './f_ctrl.c';
import { f_mv } from './f_mv.c';

@Component({
	templateUrl: 'app/templates/main.html'
})

export class MainComponent {

	constructor(private f_mv: f_mv, private f_ctrl: f_ctrl){}
	public ngAfterViewInit(): void {
		window.scope = this;
		//this.f_mv.next();
	}
}

declare var window: any;