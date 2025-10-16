import { Cell } from "$src/components/cell";
import { rotation, button_rots } from "$src/utilities/digit";

export class FsButton {
  private el?: HTMLElement;
  private onClickCallback?: () => void;

  constructor(private small: boolean) {}

  create() {
    const existing = document.getElementById("fs-btn");
    if (existing) existing.remove();

    const size = this.small ? 4 : 9;
    const symbols = this.small ? button_rots["S"] : button_rots["L"];

    const el = document.createElement("div");
    el.id = "fs-btn";
    el.classList.add("fs-button");

    const gridSize = this.small ? 2 : 3;
    el.style.display = "grid";
    el.style.gridTemplateColumns = `repeat(${gridSize}, 1.5rem)`;
    el.style.gridTemplateRows = `repeat(${gridSize}, 1.5rem)`;
    el.style.gap = "0.25rem";
    el.style.marginTop = "20px";
    el.style.cursor = "pointer";

    for (let i = 0; i < size; i++) {
      const cell = Cell.create(i);
      const symbol = symbols[i % symbols.length];


      Cell.tick(
        cell,
        [
          rotation[symbol as keyof typeof rotation][0],
          rotation[symbol as keyof typeof rotation][1],
        ],
        false
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

  destroy() {
    if (this.el) {
      this.el.remove();
      this.el = undefined;
    }
    this.onClickCallback = undefined;
  }
}
