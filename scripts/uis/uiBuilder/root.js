// Added in v0.1
import { system, world } from "@minecraft/server";
import icons from "../../api/icons";
import uiBuilder from "../../api/uiBuilder";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import http from "../../networkingLibs/currentNetworkingLib";
import uiManager from "../../uiManager";
import { ChestFormData } from "../../lib/chestUI"
uiManager.addUI(config.uiNames.UIBuilderRoot, "UI Builder Root", (player)=>{
    let form = new ActionForm();
    form.title("UI Builder");
    form.button(`§aAdd\n§r§7Add a UI`, icons.resolve("leaf/image-740"), (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderAdd);
    })
    form.button(`§6Search\n§r§7Search your UIs`, icons.resolve("Packs/Asteroid/spyglass_flat"), (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderSearch);
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
    // let chestForm = new ChestFormData("45");
    // for(let i = 0;i < 9;i++) {
    //     chestForm.button(i, "§c§lX", [], `textures/blocks/glass_gray`);
    // }
    // for(let i = 36;i < 45;i++) {
    //     chestForm.button(i, "§c§lX", [], `textures/blocks/glass_gray`);
    // }

    // chestForm.show(player)
    // let actionForm = new ActionForm();
    // actionForm.title("§f§u§l§l§s§c§r§e§e§n§r§cGUIs");
    // actionForm.button("§a§lAdd a form\n§7Create a UI", icons.resolve("leaf/image-740"), (player)=>{

    // })
})