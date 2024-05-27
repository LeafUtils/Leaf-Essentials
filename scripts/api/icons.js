class Icons {
    constructor() {
        this.icons = new Map([
            ["vanilla/iron_sword", "textures/items/iron_sword"]
        ]);
    }
    resolve(iconID) {
        if(this.icons.has(iconID)) return this.icons.get(iconID);
        return null;
    }
}
export default new Icons();