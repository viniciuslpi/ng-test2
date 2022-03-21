import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appAction]'
})

export class ActionDirective{

  @Output() appAction: EventEmitter<Event> = new EventEmitter();

  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    this.appAction.emit(event);
  }

  @HostListener('keyup', ['$event'])
  handleKeyup(event: KeyboardEvent): void{
    this.appAction.emit(event);
  }

}
