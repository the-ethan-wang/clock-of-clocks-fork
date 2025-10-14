import { El } from "$src/components/element";

class HandComponent {
  create() {
    return El.create({ type: "div", classes: "hand" });
  }

  tick(hand: HTMLElement, rotation: number, loading: boolean = false, index?: number) {
    if (loading) {
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

      const frames = index === 0 ? clockwise : anticlockwise;

      hand.animate(frames, {
        duration: 2000,
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
