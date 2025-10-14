import { Digit } from "$src/components/digit";
import { El } from "$src/components/element";

class FieldComponent {
  create(field: string, small: boolean) {
    return El.create({ 
      type: "div", 
      classes: "pair", 
      data: { field },
      children: [Digit.create(0, small), Digit.create(1, small)]
    });
  }

  tick(name: string, value: string, small: boolean, loading: boolean=false) {
    El.get({ data: { key: "field", value: name } })
      .children
      .map((digit, index) => Digit.tick(digit, value[index], small, loading));
  }
}

export const Field = new FieldComponent();