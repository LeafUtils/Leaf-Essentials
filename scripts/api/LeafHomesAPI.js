import { world } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";
import { SegmentedStoragePrismarine } from "../prismarineDbStorages/segmented";
import playerStorage from "./playerStorage";

class HomesAPI {
    constructor() {
        this.db = prismarineDb.customStorage("homes", SegmentedStoragePrismarine);
        this.maxHomes = 5;
    }
    createHome(name, player) {
        let ownerId = playerStorage.getID(player);
        if(this.db.findFirst({name, ownerId})) return false;
        let homes = this.db.findDocuments({name,ownerId});
        if(homes.length > this.maxHomes) return false;
        let {x,y,z} = player.location;
        this.db.insertDocument({
            name,
            ownerId,
            sharedTo: [],
            location: {x,y,z}
        });
    }
}

export default new HomesAPI();