class UIManager {
    constructor() {
        this.uis = [];
    }
    addUI(id, desc, ui) {
        this.uis.push({id, ui, desc});
    }
    open(player, id, ...data) {
        let ui = this.uis.find(_=>_.id == id)
        if(ui) ui.ui(player, ...data);
    }
}
export default new UIManager();