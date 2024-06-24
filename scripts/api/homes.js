import { isVec3, prismarineDb } from "../lib/prismarinedb";
import { SegmentedStoragePrismarine } from "../prismarineDbStorages/segmented";
import playerStorage from "./playerStorage";
class Homes {
    constructor() {
        this.db = prismarineDb.customStorage("Homes", SegmentedStoragePrismarine);
    }
    createHome(player, name, vec3) {
        if(!isVec3(vec3)) return
        let id = playerStorage.getID(player);
        let doc = this.db.findFirst({
            name,
            owner: id
        });
        if(doc) {
            doc.data.loc = vec3;
            this.db.overwriteDataByID(doc.id, doc.data);
            return doc.id;
        } else {
            return this.db.insertDocument({
                name,
                owner: id,
                sharedTo: [],
                loc: vec3,
            })
        }
    }
}