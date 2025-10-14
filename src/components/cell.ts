import { Dot } from "$src/components/dot";
import { El } from "$src/components/element";
import { Hand } from "$src/components/hand";

class CellComponent {
  create(index: number) {
    return El.create({ 
      type: "div", 
      classes: "cell", 
      data: { index },
      children: [Hand.create(), Hand.create(), Dot.create()]
    });
  }

  tick(cell: HTMLElement, rotation: number[], loading: boolean = false) {
    El.children(cell)
      .map((hand, index) => {
        if (index < 2) {
          Hand.tick(hand, rotation[index], loading, index);
        }
      });
  }
}

export const Cell = new CellComponent();
