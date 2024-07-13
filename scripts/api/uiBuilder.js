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
        this.uiState = this.db.keyval("state");
        // this.uiState.delete("CreateUIs");
        if(!this.uiState.has("CreateUIs3")) {
            // this.db.insertDocument({
            //     "name": "<ServerTitle>",
            //     "body": "<ServerBody>",
            //     "type": 0,
            //     special: true,
            //     "buttons": [
            //       {
            //         "text": "§dTransfer Money",
            //         "subtext": "Click me!",
            //         "action": "/scriptevent leaf:open_default Leaf/Pay",
            //         "iconID": "leaf/image-477",
            //         "requiredTag": ""
            //       },
            //       {
            //         "text": "§eWarps",
            //         "subtext": "View/edit server warps",
            //         "action": "/scriptevent leaf:open_default Leaf/Warps",
            //         "iconID": "leaf/image-749",
            //         "requiredTag": ""
            //       },
            //       {
            //         "text": "§6Clans",
            //         "subtext": "Click me!",
            //         "action": "/scriptevent leaf:open_default Leaf/Clans",
            //         "iconID": "leaf/image-625",
            //         "requiredTag": ""
            //       },
            //       {
            //         "text": "§cHomes",
            //         "subtext": "View/Edit your homes",
            //         "action": "/scriptevent leaf:open_default Leaf/Homes",
            //         "iconID": "leaf/image-773",
            //         "requiredTag": ""
            //       },
            //       {
            //         "text": "§qLand Claims",
            //         "subtext": "Claim your land",
            //         "action": "/scriptevent leaf:open_default Leaf/LandClaims",
            //         "iconID": "leaf/image-558",
            //         "requiredTag": ""
            //       },
            //       {
            //         "text": "§bConfig",
            //         "subtext": "Edit Server Config",
            //         "action": "/scriptevent leaf:open_default Leaf/Config/Root",
            //         "iconID": "leaf/image-068",
            //         "requiredTag": "admin"
            //       }
            //     ],
            //     "scriptevent": "leaf_server_gui"
            // })
            this.uiState.set("CreateUIs3", 1);
        }
        // this.db.clear();

        system.afterEvents.scriptEventReceive.subscribe(e=>{
            if(e.sourceType == ScriptEventSource.Entity && e.id == config.scripteventNames.open) {
                let ui = this.db.findFirst({scriptevent: e.message});
                if(ui) {
                    this.open(ui.id, e.sourceEntity);
                }
            }
        })
    }
    getByID(id) {
        return this.db.getByID(id);
    }
    createUI(name, body = null, type = "normal", scriptevent, layout = 0) {
        return this.db.insertDocument({
            name,
            body,
            layout,
            type: type == "normal" ? 0 : -1,
            buttons: [],
            subuis: {},
            scriptevent
        })
    }
    createSubform(name, body = null, type = "normal", subname, root) {
        let root2 = this.getByID(root);
        if(!root2) return;
        // return this.db.insertDocument({
        //     name,
        //     body,
        //     type: type == "normal" ? 0 : -1,
        //     buttons: [],
        //     scriptevent: subname,
        //     subname
        // })
    }
    addButtonToUI(id, text, subtext = null, action = "", iconID = "", requiredTag) {
        let doc = this.getByID(id);
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
        let doc = this.getByID(id);
        if(!doc) return;
        if(doc.data.type == 0) return normalForm.open(player, doc.data);
    }
    getUIs() {
        return this.db.findDocuments({type:0});
    }
    moveButtonInUI(id, type = "up", index = 0) {
        let doc = this.getByID(id);
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