import { Clock } from "$src/components/clock";
import { Cell } from "$src/components/cell";
import { El } from "$src/components/element";
import { equal, now } from "$src/utilities/time";
import type { Time } from "$src/types/time";
import { rotation } from "$src/utilities/digit";

class App {
  time: Time = now();
  small: boolean = false;
  mainClock?: HTMLElement;
  btn?: HTMLElement;

  init() {
    // create clock container
    const clockContainer = document.createElement("div");
    clockContainer.id = "clock-container";
    El.append("app", clockContainer);

    // create main clock
    this.mainClock = Clock.create(this.small);
    El.append("clock-container", this.mainClock);

    // create toggle button
    this.createToggleButton();

    // initial main clock animation
    Clock.tick(this.time, this.small, true);

    // start live ticking
    setTimeout(() => this.tick(), 2000);
  }

  createToggleButton() {
    // remove old button if exists
    if (this.btn) this.btn.remove();

    const size = this.small ? 4 : 9; // small = 2x2, big = 3x3
    const symbols = this.small ? ["┌", "┐", "└", "┘"] : ["┌", "-", "┐", "|", " ", "|", "└", "-", "┘"] ; // we’ll reuse for all cells

    this.btn = El.create({
      type: "div",
      classes: "toggle-button",
      children: Array.from({ length: size }, (_, i) => {
        const cell = Cell.create(i);
        const symbol = symbols[i % symbols.length]; // repeat symbols if needed
        Cell.tick(cell, [rotation[symbol as keyof typeof rotation][0], rotation[symbol as keyof typeof rotation][1]], false);
        return cell;
      })
    });

    const gridSize = this.small ? 2 : 3;
    this.btn.style.display = "grid";
    this.btn.style.gridTemplateColumns = `repeat(${gridSize}, 1.5rem)`;
    this.btn.style.gridTemplateRows = `repeat(${gridSize}, 1.5rem)`;
    this.btn.style.gap = "0.25rem";
    this.btn.style.marginTop = "20px";
    this.btn.style.cursor = "pointer";

    El.append("app", this.btn);

    this.btn.onclick = () => {
      this.small = !this.small;

      // recreate main clock
      if (this.mainClock) this.mainClock.remove();
      this.mainClock = Clock.create(this.small);
      El.append("clock-container", this.mainClock);

      // animate main clock on toggle
      Clock.tick(this.time, this.small, true);

      // recreate button with new size
      this.createToggleButton();
    };
  }

  interval() {
    const time = now();
    if (!equal(time, this.time)) {
      this.time = Clock.tick(time, this.small); // live update
    }
  }

  tick() {
    Clock.tick(this.time, this.small); // live update
    setInterval(() => this.interval(), 100);
  }
}

export const app = new App();
