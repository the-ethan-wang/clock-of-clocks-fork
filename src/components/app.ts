import { Clock } from "$src/components/clock";
import { El } from "$src/components/element";
import { equal, now } from "$src/utilities/time";
import type { Time } from "$src/types/time";

class App {
  time: Time = now();
  small: boolean = false; // current size
  mainClock?: HTMLElement;

  init() {
    // create main clock
    this.mainClock = Clock.create(this.small);
    El.append("app", this.mainClock);

    // create toggle button
    const btn = document.createElement("button");
    btn.innerText = "Toggle Small";
    btn.style.marginTop = "20px";
    btn.onclick = () => {
      this.small = !this.small;
    };
    El.append("app", btn);

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
