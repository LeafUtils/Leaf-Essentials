import { system, world } from "@minecraft/server";
import { prismarineDb } from "./lib/prismarinedb";

class LeaderboardHandler {
    constructor() {
        this.db = prismarineDb.table("Leaderboards");
        system.runInterval(()=>{
            this.updateLeaderboards();
        },30);
    }
    addLeaderboard(objective, vec3) {
        this.db.insertDocument({
            loc: vec3,
            objective,
            showOffline: true,
            theme: 0,
            id: Date.now().toString()
        });
    }
    updateLeaderboards() {
        let lbText = [`${Date.now()}`]
        // for(const doc of this.db.data) {
        //     let lbText = [`a`];
        // }
        for(const lb of this.db.data) {
            let entityID = lb.data.entityID ? lb.data.entityID : null;
            if(entityID) {
                try {
                    let entity = world.getEntity(entityID);
                    if(!entity) {
                        entity = world.getDimension('overworld').spawnEntity('leaf:floating_text', lb.data.loc);
                        entity.nameTag = lbText.join('\n§r')
                        lb.data.entityID = entity.id;
                        this.db.overwriteDataByID(lb.id, lb.data);
                    }
                    entity.nameTag = lbText.join('\n§r')
                } catch(e) {
                    if(!(`${e}`.includes('LocationInUnloadedChunkError'))) {
                        let entity = world.getDimension('overworld').spawnEntity('leaf:floating_text', lb.data.loc);
                        entity.nameTag = lbText.join('\n§r')
                        lb.data.entityID = entity.id;
                        this.db.overwriteDataByID(lb.id, lb.data);
                    }
                }
            } else {
                let entity = world.getDimension('overworld').spawnEntity('leaf:floating_text', lb.data.loc);
                entity.nameTag = lbText.join('\n§r')
                lb.data.entityID = entity.id;
                this.db.overwriteDataByID(lb.id, lb.data);
            }
        }
    }
}

let leaderboardHandler = new LeaderboardHandler();

export default leaderboardHandler;