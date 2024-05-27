import config from "../config";
import { ActionForm } from "../lib/form_func";
import { prismarineDb } from "../lib/prismarinedb";
import actionParser from "./actionParser";
import normalForm from "./openers/normalForm";
import { system, ScriptEventSource } from '@minecraft/server';

class UIBuilder {
    constructor() {
        this.db = prismarineDb.table(config.tableNames.uis);
        this.db.clear();

        system.afterEvents.scriptEventReceive.subscribe(e=>{
            if(e.sourceType == ScriptEventSource.Entity && e.id == config.scripteventNames.open) {
                let ui = this.db.findFirst({scriptevent: e.message});
                this.open(ui.id, e.sourceEntity);
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
    addButtonToUI(id, text, subtext = null, action = "", iconID = "") {
        let doc = this.db.getByID(id);
        if(!doc) return;
        if(doc.data.type != 0) return;
        doc.data.buttons.push({
            text,
            subtext,
            action,
            iconID
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
}
export default new UIBuilder();