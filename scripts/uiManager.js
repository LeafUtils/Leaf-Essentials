import { functionStore } from "./lib/prismarinedb";

class UIManager {
    #store
    #descriptions
    constructor() {
        this.#store = functionStore.getStore("uis");
        this.#descriptions = new Map();
    }
    get uis() {
        return [...this.#store.getList()].map(_=>{
            return {
                id: _,
                ui: function(){},
                desc: this.#descriptions.get(_)
            }
        });
    }
    addUI(id, desc, ui) {
        this.#descriptions.set(id, desc ? desc : "No Description");
        this.#store.add(id, ui)
    }
    open(player, id, ...data) {
        this.#store.call(id, player, ...data);
    }
}
export default new UIManager();