import { Clock } from "$src/components/clock";
import { Cell } from "$src/components/cell";
import { El } from "$src/components/element";
import { equal, now } from "$src/utilities/time";
import type { Time } from "$src/types/time";

class App {
  time: Time = now();
  small: boolean = false;
  mainClock?: HTMLElement;

  init() {
  // create clock container
  const clockContainer = document.createElement("div");
  clockContainer.id = "clock-container";
  El.append("app", clockContainer);

  // create main clock inside container
  this.mainClock = Clock.create(this.small);
  El.append("clock-container", this.mainClock);

  // create toggle button once (outside the clock container)
  const btn = El.create({
    type: "div",
    classes: "toggle-button",
    children: [Cell.create(0), Cell.create(1), Cell.create(2), Cell.create(3)]
  });

  btn.style.display = "grid";
  btn.style.gridTemplateColumns = "repeat(2, 1.5rem)";
  btn.style.gridTemplateRows = "repeat(2, 1.5rem)";
  btn.style.gap = "0.25rem";
  btn.style.marginTop = "20px";
  btn.style.cursor = "pointer";

  // append button directly to #app, not the clock container
  El.append("app", btn);

  btn.onclick = () => {
    this.small = !this.small;

    // remove old clock
    if (this.mainClock) this.mainClock.remove();

    // recreate clock inside clockContainer
    this.mainClock = Clock.create(this.small);
    El.append("clock-container", this.mainClock);

    Clock.tick(this.time, this.small, true);
  };

  // initial tick
  Clock.tick(this.time, this.small, true);
  setTimeout(() => this.tick(), 2000);
}


  interval() {
    const time = now();
    if (!equal(time, this.time)) {
      this.time = Clock.tick(time, this.small);
    }
  }

  tick() {
    Clock.tick(this.time, this.small);
    setInterval(() => this.interval(), 100);
  }
}

export const app = new App();
