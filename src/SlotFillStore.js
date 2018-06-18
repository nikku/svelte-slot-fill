import { Store } from 'svelte/store';

export default class SlotFillStore extends Store {

  constructor() {
    super({
      fills: []
    });

    this.uuid = 1009;
  }

  addFill({ uuid, name, component }) {

    const newUuid = this.uuid++;

    const {
      fills
    } = this.get();

    let updated = false;

    const newFill = {
      uuid: newUuid,
      name,
      component
    };

    const newFills = fills.map(function(f) {
      if (f.uuid === uuid) {
        updated = true;

        return newFill;
      } else {
        return f;
      }
    });

    if (!updated) {
      newFills.push(newFill);
    }

    this.set({
      fills: newFills
    });

    return newUuid;
  }

  removeFill({ uuid }) {

    const {
      fills
    } = this.get();

    const newFills = fills.filter(function(f) {
      return f.uuid !== uuid;
    });

    this.set({
      fills: newFills
    });
  }

}