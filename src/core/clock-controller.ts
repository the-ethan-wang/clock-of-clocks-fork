import { Clock } from "$src/components/clock";
import { El } from "$src/components/element";
import { now, equal } from "$src/utilities/time";
import type { Time } from "$src/types/time";

export class ClockController {
  private clockEl?: HTMLElement;
  private small = false;
  private time: Time = now();

  mount(containerId: string) {
    const container = document.createElement("div");
    container.id = "clock-container";
    El.append(containerId, container);

    this.clockEl = Clock.create(this.small);
    El.append("clock-container", this.clockEl);
  }

  toggleSize() {
    this.small = !this.small;
    if (this.clockEl) this.clockEl.remove();
    this.clockEl = Clock.create(this.small);
    El.append("clock-container", this.clockEl);
    Clock.tick(this.time, this.small, true);
  }

  updateIfNeeded() {
    const current = now();
    if (!equal(current, this.time)) {
      this.time = Clock.tick(current, this.small);
    }
  }

  animateOnce() {
    Clock.tick(this.time, this.small, true);
  }

  normalTick() {
    Clock.tick(this.time, this.small);
  }

  isSmall() {
    return this.small;
  }
}