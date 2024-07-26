// Added in v0.1
import { system, world } from "@minecraft/server";
import icons from "../../api/icons";
import uiBuilder from "../../api/uiBuilder";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import http from "../../networkingLibs/currentNetworkingLib";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderRoot, "UI Builder Root", (player)=>{
    let form = new ActionForm();
    form.title("UI Builder");
    form.button(`§aAdd\n§r§7Add a UI`, icons.resolve("leaf/image-740"), (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderAdd);
    })
    if(http.player) {
        form.button(`§aBrowse\n§r§7Browse global GUIs`, icons.resolve("leaf/image-806"), (player)=>{
            http.makeRequest({
                method: 'get',
                url: `${config.Endpoint}/guis/list`
            }, (status, data)=>{
                system.run(()=>{
                    uiManager.open(player, config.uiNames.OnlineGUIsList, data, "main")
                })
            })
        })
    }
    for(const ui of uiBuilder.getUIs()) {
        form.button(`§b${ui.data.name}\n§r§7Normal Form`, null, (player)=>{
            uiManager.open(player, config.uiNames.UIBuilderEdit, ui.id)
        })
    }
    form.show(player, false, ()=>{})
})