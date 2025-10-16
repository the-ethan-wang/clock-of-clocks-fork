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
  private currentColour: string = this.colourButton?.getColour()!
  private colourList: string[] = [""];

  init() {
    this.clock.mount("app");
    this.colourList = Array.from({ length: 4 }, () => `oklch(${Math.random() * 0.5 + 0.5} ${Math.random() * 0.4} ${Math.random() * 360})`);
    this.createButtonContainer();
    this.createSizeButton();
    this.createFsButton();
    this.createColourButton();
    this.clock.animateOnce(this.currentColour);
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
    this.colourButton.create(this.colourList);
    this.colourButton.onClick(() => {
      this.currentColour = this.colourButton?.getColour()!
      this.colourList.shift();
      this.colourList.push(this.currentColour)
      this.clock.forceUpdate(this.currentColour);
      this.colourButton?.setColour(this.colourList)
      this.fsButton?.setColour(this.currentColour)
      this.sizeButton?.setColour(this.currentColour)
      console.log(this.currentColour)
      document.documentElement.style.setProperty('--hand-color', this.currentColour);
    });
  }

  createSizeButton() {
    this.sizeButton = new SizeButton(this.clock.isSmall());
    this.sizeButton.create(this.currentColour);
    this.sizeButton.onClick(() => {
      this.tickManager.clearAll();
      this.clock.toggleSize(this.currentColour);
      this.createSizeButton();
      this.createFsButton();
      this.createColourButton();
      this.tickManager.delay(() => this.startTicking(), TOGGLE_DELAY);
    });
  }

  createFsButton() {
    this.fsButton = new FsButton(this.clock.isSmall());
    this.fsButton.create(this.currentColour);
    this.fsButton.onClick(() => {
      let d = document;
      d.fullscreenElement ? d.exitFullscreen() : d.documentElement.requestFullscreen();
    });
  }

  startTicking() {
    this.clock.normalTick(this.currentColour);
    this.tickManager.start(() => this.clock.updateIfNeeded(this.currentColour));
  }
}


export const app = new App();
