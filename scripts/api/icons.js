class Icons {
    constructor() {
        this.icons = new Map([
            ["vanilla/iron_sword", "textures/items/iron_sword"]
        ]);
    }
    install(pack) {
        let data = pack.get("pack_data");
        let namespace = pack.get("pack_namespace");
        for(const key of data.keys()) {
            this.icons.set(`${namespace}/${key}`, data.get(key));
        }
    }
    resolve(iconID) {
        if(this.icons.has(iconID)) return this.icons.get(iconID);
        return null;
    }
}
export default new Icons();