import { ClockController } from "$src/core/clock-controller";
import { TickManager } from "$src/core/tick-manager";
import { SizeButton } from "$src/components/buttons/size-button";
import { FsButton } from "$src/components/buttons/fs-button";
import { ColourButton } from "$src/components/buttons/colour-button";
import { SpeedButton } from "$src/components/buttons/speed-button";

const INITIAL_DELAY = 2000;
const TOGGLE_DELAY = 2000;

class App {
  private clock = new ClockController();
  private tickManager = new TickManager();
  private sizeButton?: SizeButton;
  private fsButton?: FsButton;
  private colourButton?: ColourButton;
  private speedButton?: SpeedButton;
  private currentColour: string = this.colourButton?.getColour()!
  private nextColour: string = this.colourButton?.getColour()!


  init() {
    this.clock.mount("app");
    this.createButtonContainer();
    this.createSizeButton();
    this.createFsButton();
    this.createSpeedButton();
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
    this.colourButton.create(this.nextColour);
    this.colourButton.onClick(() => {
      this.currentColour = this.nextColour
      this.nextColour = this.colourButton?.getColour()!
      this.clock.forceUpdate(this.currentColour);
      this.colourButton?.setColour(this.nextColour)
      this.fsButton?.setColour(this.currentColour)
      this.speedButton?.setColour(this.currentColour)
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
      this.createSpeedButton();
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

  createSpeedButton() {
    this.speedButton = new SpeedButton(this.clock.isSmall());
    this.speedButton.create(this.currentColour);
    
    this.speedButton.onClick(() => {
      const thingy = [600, 1000, 0, 250]
      const curr = document.documentElement.style.getPropertyValue("--cycle")
      console.log(curr)
      let index = thingy.indexOf(parseInt(curr.replace("ms", ""))) + 1
      if (index === thingy.length) {index = 0}
      const newcycle = `${thingy[index]}ms`
      console.log(newcycle)
      document.documentElement.style.setProperty("--cycle", newcycle)
    });
  }

  startTicking() {
    this.clock.normalTick(this.currentColour);
    this.tickManager.start(() => this.clock.updateIfNeeded(this.currentColour));
  }
}


export const app = new App();
