export class TickManager {
  private intervalId?: number;
  private timeoutId?: number;

  start(callback: () => void, interval = 100) {
    this.stopInterval();
    this.intervalId = window.setInterval(callback, interval);
  }

  delay(callback: () => void, delay: number) {
    this.stopTimeout();
    this.timeoutId = window.setTimeout(() => {
      this.timeoutId = undefined;
      callback();
    }, delay);
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  stopTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  clearAll() {
    this.stopInterval();
    this.stopTimeout();
  }
}