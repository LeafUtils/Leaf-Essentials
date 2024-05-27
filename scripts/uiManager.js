class UIManager {
    constructor() {
        this.uis = [];
    }
    addUI(id, desc, ui) {
        this.uis.push({id, ui, desc});
    }
    open(player, id) {
        let ui = this.uis.find(_=>_.id == id)
        if(ui) ui.ui(player);
    }
}
export default new UIManager();