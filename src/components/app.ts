import { ClockController } from "$src/core/clock-controller";
import { TickManager } from "$src/core/tick-manager";
import { SizeButton } from "$src/components/size-button";

const INITIAL_DELAY = 4000;
const TOGGLE_DELAY = 2000;

class App {
  private clock = new ClockController();
  private tickManager = new TickManager();
  private sizeButton?: SizeButton;

  init() {
    this.clock.mount("app");
    this.createSizeButton();

    this.clock.animateOnce();
    this.tickManager.delay(() => this.startTicking(), INITIAL_DELAY);
  }

  createSizeButton() {
    this.sizeButton = new SizeButton(this.clock.isSmall());
    this.sizeButton.create();

    this.sizeButton.onClick(() => {
      this.tickManager.clearAll();
      this.clock.toggleSize();
      this.createSizeButton();
      this.tickManager.delay(() => this.startTicking(), TOGGLE_DELAY);
    });
  }

  startTicking() {
    this.clock.normalTick();
    this.tickManager.start(() => this.clock.updateIfNeeded());
  }
}

export const app = new App();
