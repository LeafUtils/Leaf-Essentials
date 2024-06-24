class Icons {
    constructor() {
        this.icons = new Map([
            ["vanilla/iron_sword", "textures/items/iron_sword"]
        ]);
    }
    install(pack, ignoreNamespace = false) {
        let data = pack.get("pack_data");
        let namespace = pack.get("pack_namespace");
        for(const key of data.keys()) {
            this.icons.set(`${!ignoreNamespace ? `${namespace}/` : ``}${key}`, typeof data.get(key) === "object" ? data.get(key).path : data.get(key));
        }
    }
    resolve(iconID) {
        if(iconID.startsWith('^')) {
            return iconID.substring(1)
        }
        if(this.icons.has(iconID)) return this.icons.get(iconID);
        return null;
    }
}
export default new Icons();