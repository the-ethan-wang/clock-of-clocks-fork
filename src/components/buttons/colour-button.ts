import { Cell } from "$src/components/cell";
import { rotation, button_rots } from "$src/utilities/digit";

export class ColourButton {
  private el?: HTMLElement;
  private onClickCallback?: () => void;
  private output: string[] = [""];
  constructor(private small: boolean) {}

  create(colourList: string[], ) {
    this.output = [""];
    const existing = document.getElementById("colour-btn");
    if (existing) existing.remove();

    const size = this.small ? 4 : 9;
    //const symbols = this.small ? button_rots["S"] : button_rots["L"];
    const el = document.createElement("div");
    el.id = "colour-btn";
    el.classList.add("colour-button");
    const symbols = this.small ? button_rots["S"] : button_rots["L"];
    const gridSize = this.small ? 2 : 3;
    el.style.display = "grid";
    el.style.gridTemplateColumns = `repeat(${gridSize}, 1.5rem)`;
    el.style.gridTemplateRows = `repeat(${gridSize}, 1.5rem)`;
    el.style.gap = "0.25rem";
    el.style.marginTop = "20px";
    el.style.cursor = "pointer";
    let e = colourList[0];
        if (size === 4) {
          this.output = colourList
        } else if (size === 9) {
          this.output = [colourList[0], colourList[0], colourList[1], colourList[1], e, colourList[2], colourList[2], colourList[3], colourList[3]]
        }
    for (let i = 0; i < size; i++) {
      const cell = Cell.create(i);
      const symbol = symbols[i % symbols.length];

      Cell.tick(
        cell,
        [
          rotation[symbol as keyof typeof rotation][0],
          rotation[symbol as keyof typeof rotation][1],
        ],
        false, this.output[i]
      );

      el.appendChild(cell);
    }

    const container = document.getElementById("button-container");
    if (container) {
      container.appendChild(el);
    }

    this.el = el;
    this.el.onclick = () => this.onClickCallback?.();
  }

  onClick(cb: () => void) {
    this.onClickCallback = cb;
  }

  getColour() {
      return `oklch(${Math.random() * 0.5 + 0.5} ${Math.random() * 0.4} ${Math.random() * 360})`;
  }

  setColour(colourList:string[]) {
    const size = this.small ? 4 : 9;
    let e = colourList[0];
    if (size === 4) {
      this.output = colourList
    } else if (size === 9) {
      this.output = [colourList[0], colourList[0], colourList[1], colourList[1], e, colourList[2], colourList[2], colourList[3], colourList[3]]
    }
    console.log(this.output)
    if (this.el) {
    for (let i = 0; i < this.el.children.length; i++) {
        const cell = this.el.children.item(i) as HTMLElement;
        if (cell) {
          const symbol = button_rots[this.small ? "S" : "L"][i % (this.small ? 4 : 9)];

          Cell.tick(
            cell,
            [
              rotation[symbol as keyof typeof rotation][0],
              rotation[symbol as keyof typeof rotation][1],
            ],
            false, this.output[i]
          );
        }
      }
  } 
}

  destroy() {
    if (this.el) {
      this.el.remove();
      this.el = undefined;
    }
    this.onClickCallback = undefined;
  }
}
