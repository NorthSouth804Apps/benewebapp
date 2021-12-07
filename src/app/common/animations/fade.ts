import { trigger, state, transition, animate, style } from "@angular/animations";

export const fade = trigger('fade', [
    state('in', style({
      maxHeight: '100%',
      opacity: 1,
    })),
    state('out', style({
      maxHeight: '0',
      opacity: 0,
      position: 'absolute',
      zIndex: -1,
    })),
    transition('in => out', [
      animate('1s')
    ]),
    transition('out => in', [
      animate('0.5s')
    ]),
  ])