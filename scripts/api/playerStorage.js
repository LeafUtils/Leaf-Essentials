import { world } from '@minecraft/server';
import { prismarineDb } from '../lib/prismarinedb';
const generateUUID = () => {
    let
      d = new Date().getTime(),
      d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
  };
class SegmentedStoragePrismarine {
    load(table) {
        let segmentCount = 0;
        try {
            segmentCount = world.getDynamicProperty(`segmentedstorage:segment_count_${table}`);
        } catch { segmentCount = 0 }
        if(!segmentCount) segmentCount = 0;
        if(segmentCount <= 0) return [];
        if(typeof segmentCount !== "number") {
            world.setDynamicProperty(`segmentedstorage:segment_count_${table}`, 0);
            return [];
        }
        let val = ``;
        for(let i = 0;i < segmentCount;i++) {
            let valToAppend = ``;
            try {
                valToAppend = world.getDynamicProperty(`segmentedstorage_${i}:${table}`);
            } catch {valToAppend = ``}
            if(!valToAppend) valToAppend = ``;
            val += valToAppend;
        }
        try {
            return JSON.parse(val);
        } catch {
            return [];
        }
    }
    save(table, data) {
        let data2 = JSON.stringify(data).match(/.{1,32767}/g);
        for(let i = 0;i < data2.length;i++) {
            world.setDynamicProperty(`segmentedstorage_${i}:${table}`, data2[i]);
        }
        world.setDynamicProperty(`segmentedstorage:segment_count_${table}`, data.length);
    }
}


class PlayerStorage {
    constructor() {
        this.db = prismarineDb.customStorage("PlayerStorage", SegmentedStoragePrismarine);
        this.keyval = this.db.keyval("playerstorage");
    }
    getID(player) {
        let entityTable = prismarineDb.entityTable("Data", player);
        let keyval = entityTable.keyval("_data");
        let id = keyval.get("id")
        if(!id) {
            let uuid = generateUUID();
            keyval.set("id", uuid);
            return uuid;
        } else {
            return id;
        }
    }
    getScore(player, objective) {
        let score = 0;
        try {
            score = world.scoreboard.getObjective(objective).getScore(player);
        } catch {score = null;}
        return score;
    }
    saveData(player) {
        let scores = [];
        for(const objective of world.scoreboard.getObjectives()) {
            let score = this.getScore(player, objective.id);
            if(score == null) continue;
            scores.push({objective: objective.id, score});
        }
        let tags = player.getTags();
        let dynamicProperties = {};
        try {
            for(const property of player.getDynamicPropertyIds()) {
                dynamicProperties[property] = player.getDynamicProperty(property);
            }
       } catch {}
        this.keyval.set(this.getID(player), {
            tags,
            dynamicProperties,
            scores,
            name: player.name,
            location: {x: player.location.x, y:player.location.y, z: player.location.z}
        })
    }
    getPlayerByID(id) {
        return this.keyval.get(id);
    }
}

export default new PlayerStorage();