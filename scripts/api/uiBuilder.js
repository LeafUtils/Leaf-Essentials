import config from "../config";
import { ActionForm } from "../lib/form_func";
import { prismarineDb } from "../lib/prismarinedb";
import actionParser from "./actionParser";
import normalForm from "./openers/normalForm";
import { system, ScriptEventSource } from '@minecraft/server';
import { array_move } from "./utils/array_move";

class UIBuilder {
    constructor() {
        this.db = prismarineDb.table(config.tableNames.uis);
        // this.db.clear();

        system.afterEvents.scriptEventReceive.subscribe(e=>{
            if(e.sourceType == ScriptEventSource.Entity && e.id == config.scripteventNames.open) {
                let ui = this.db.findFirst({scriptevent: e.message});
                if(ui) {
                    system.runTimeout(()=>{
                        this.open(ui.id, e.sourceEntity);

                    },40);
                }
            }
        })
    }
    createUI(name, body = null, type = "normal", scriptevent) {
        return this.db.insertDocument({
            name,
            body,
            type: type == "normal" ? 0 : -1,
            buttons: [],
            scriptevent
        })
    }
    addButtonToUI(id, text, subtext = null, action = "", iconID = "", requiredTag) {
        let doc = this.db.getByID(id);
        if(!doc) return;
        if(doc.data.type != 0) return;
        doc.data.buttons.push({
            text,
            subtext,
            action,
            iconID,
            requiredTag
        });
        this.db.overwriteDataByID(id, doc.data);
    }
    open(id, player) {
        let doc = this.db.getByID(id);
        if(!doc) return;
        if(doc.data.type == 0) return normalForm.open(player, doc.data);
    }
    getUIs() {
        return this.db.findDocuments(null);
    }
    moveButtonInUI(id, type = "up", index = 0) {
        let doc = this.db.getByID(id);
        if(!doc) return;
        if(doc.data.type != 0) return;
        if(index >= doc.data.buttons.length) return;
        if(index < 0) return;
        if(type == "up" && index - 1 < 0) return;
        if(type == "down" && index + 1 >= doc.data.buttons.length) return;
        array_move(doc.data.buttons, index, type == "up" ? index - 1 : index + 1);
        this.db.overwriteDataByID(id, doc.data);
    }
}
export default new UIBuilder();