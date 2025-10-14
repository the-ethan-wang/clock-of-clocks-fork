import { El } from "$src/components/element";

class HandComponent {
  create() {
    return El.create({ type: "div", classes: "hand" });
  }

  tick(hand: HTMLElement, rotation: number, loading: boolean = false, handIndex?: number, cellIndex?: number) {
    if (loading) {
      // Cancel any existing animations
      hand.getAnimations().forEach(a => a.cancel());

      const clockwise = [
        { rotate: "270deg" },
        { rotate: "0deg" },
        { rotate: "90deg" },
        { rotate: "180deg" },
        { rotate: "270deg" },
      ];

      const anticlockwise = [
        { rotate: "90deg" },
        { rotate: "180deg" },
        { rotate: "270deg" },
        { rotate: "0deg" },
        { rotate: "90deg" },
      ];

      const frames = handIndex === 0 ? clockwise : anticlockwise;

      const delay = (cellIndex || 0) * 50; // 50ms per cell offset

      hand.animate(frames, {
        duration: 2000,
        delay,
        iterations: Infinity,
        easing: "ease-in-out"
      });
    } else {
      hand.getAnimations().forEach(a => a.cancel());
      hand.style.rotate = `${rotation}deg`;
    }
  }
}

export const Hand = new HandComponent();
