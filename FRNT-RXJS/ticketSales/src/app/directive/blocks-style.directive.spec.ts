import { BlocksStyleDirective } from './blocks-style.directive';
import { ElementRef } from '@angular/core';

describe('BlocksStyleDirective', (): void => {
  it('should create an instance', (): void => {
    let el: ElementRef | any = 'string';
    const directive: BlocksStyleDirective = new BlocksStyleDirective(el);
    expect(directive).toBeTruthy();
  });
});
