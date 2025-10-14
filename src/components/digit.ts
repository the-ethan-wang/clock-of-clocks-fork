import { Cell } from "$src/components/cell";
import { El } from "$src/components/element";

import { cell } from "$src/utilities/digit";

class DigitComponent {
  create(index: number, small: boolean) {
    let size;
    if (small) {size = 6;} else {size = 24;}
    let children = Array.from({ length: size }, (_, i) => Cell.create(i));

    return El.create({ 
      type: "div", 
      classes: "digit",
      data: { index },
      children 
    });
  }

  tick(digit: HTMLElement, value: string, small: boolean, loading: boolean=false) {
    
    if (small) {
      document.documentElement.style.setProperty('--column', `2`);
      document.documentElement.style.setProperty('--row', `3`);
      // change size of digit to 6, 24 for else
    } else {
      document.documentElement.style.setProperty('--column', `4`);
      document.documentElement.style.setProperty('--row', `6`);
    }
    const targetSize = small ? 6 : 24;
    let currentChildren = El.children(digit);
    let currentSize = currentChildren.length;

    if (currentSize !== targetSize) {
      if (currentSize > targetSize) {
        // We are downsizing: remove excess cells
        const excessCount = currentSize - targetSize;
        for (let i = 0; i < excessCount; i++) {
          digit.removeChild(currentChildren[currentSize - 1 - i]);
        }
        currentChildren = El.children(digit); // Re-fetch the reduced list
      } else {
        // We are upsizing: add new cells
        for (let i = currentSize; i < targetSize; i++) {
          digit.appendChild(Cell.create(i));
        }
        currentChildren = El.children(digit); // Re-fetch the expanded list
      }
    }
    document.documentElement.style.setProperty('--hand-color', `oklch(${Math.random()} 1.0 ${Math.random()*360})`);

    El.children(digit)
      .map((node, index) => Cell.tick(node, cell(value, index, small), loading));

  }
}

export const Digit = new DigitComponent();