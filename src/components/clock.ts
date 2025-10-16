import { El } from "$src/components/element";
import { Field } from "$src/components/field";
import { setDigitSize } from '$src/utilities/digit';
import type { Time } from "$src/types/time";

class ClockComponent {
  create(small: boolean) {
    const children = [Field.create("hours", small), Field.create("minutes", small), Field.create("seconds", small)];
    setDigitSize(small);
    return El.create({ type: "div", classes: "clock", children });
  }

  tick(time: Time, small: boolean, loading: boolean=false, colour: string) {
    Field.tick("hours", time.hours, small, loading, colour);
    Field.tick("minutes", time.minutes, small, loading, colour);
    Field.tick("seconds", time.seconds, small, loading, colour);

    return time;
  }
}

export const Clock = new ClockComponent();