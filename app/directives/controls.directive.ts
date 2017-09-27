import { Directive, HostListener, EventEmitter } from '@angular/core';

@Directive({
	selector: '[controls]',
	outputs: ['controlKey']
})

export class ControlsDirective {
	controlKey = new EventEmitter();
	@HostListener("document : keydown", ['$event']) onkeypress(e) {  		
			if(e.keyCode === 37){
				e.preventDefault();
				this.controlKey.emit('left');
			}
			else if(e.keyCode === 39){
				e.preventDefault();
				this.controlKey.emit('right');
			}
			else if(e.keyCode === 38){
				e.preventDefault();
				this.controlKey.emit('transform');
			}
			else return;
	}
}