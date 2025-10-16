import { ClockController } from "$src/core/clock-controller";
import { TickManager } from "$src/core/tick-manager";
import { SizeButton } from "$src/components/buttons/size-button";
import { FsButton } from "$src/components/buttons/fs-button";
import { ColourButton } from "$src/components/buttons/colour-button";

const INITIAL_DELAY = 2000;
const TOGGLE_DELAY = 2000;

class App {
  private clock = new ClockController();
  private tickManager = new TickManager();
  private sizeButton?: SizeButton;
  private fsButton?: FsButton;
  private colourButton?: ColourButton;

  init() {
    this.clock.mount("app");
    this.createButtonContainer();
    this.createSizeButton();
    this.createFsButton();
    this.createColourButton();

    this.clock.animateOnce();
    this.tickManager.delay(() => this.startTicking(), INITIAL_DELAY);
  }

  createButtonContainer() {
      let buttonContainer = document.getElementById("button-container");
      if (!buttonContainer) {
        buttonContainer = document.createElement("div");
        buttonContainer.id = "button-container";  
        document.getElementById("app")?.appendChild(buttonContainer); 
      }
    }


  createColourButton() {
    this.colourButton = new ColourButton(this.clock.isSmall());
    this.colourButton.create();
    this.colourButton.onClick(() => {
      this.colourButton?.changeColour()
    });
  }
  createSizeButton() {
    this.sizeButton = new SizeButton(this.clock.isSmall());
    this.sizeButton.create();
    this.sizeButton.onClick(() => {
      this.tickManager.clearAll();
      this.clock.toggleSize();
      this.createSizeButton();
      this.createFsButton();
      this.createColourButton();
      this.tickManager.delay(() => this.startTicking(), TOGGLE_DELAY);
    });
  }

  createFsButton() {
    this.fsButton = new FsButton(this.clock.isSmall());
    this.fsButton.create();
    this.fsButton.onClick(() => {
      let d = document;
      d.fullscreenElement ? d.exitFullscreen() : d.documentElement.requestFullscreen();
    });
  }

  startTicking() {
    this.clock.normalTick();
    this.tickManager.start(() => this.clock.updateIfNeeded());
  }
}


export const app = new App();
