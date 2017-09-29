import { Directive, HostListener, EventEmitter } from '@angular/core';

@Directive({
	selector: '[controls]',
	outputs: ['f_controls_e']
})

export class F_ControlsDirective {
	f_controls_e = new EventEmitter();
	@HostListener("document : keydown", ['$event']) onkeypress(e) {  		
			if(e.keyCode === 37){
				e.preventDefault();
				this.f_controls_e.emit('left');
			}
			else if(e.keyCode === 39){
				e.preventDefault();
				this.f_controls_e.emit('right');
			}
			else if(e.keyCode === 38){
				e.preventDefault();
				this.f_controls_e.emit('transform');
			}
			else return;
	}
}