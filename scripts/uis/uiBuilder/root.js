// Added in v0.1
import uiBuilder from "../../api/uiBuilder";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderRoot, "UI Builder Root", (player)=>{
    let form = new ActionForm();
    form.title("UI Builder");
    form.button(`§aAdd\n§r§7Add a UI`, `textures/azalea_icons/GUIMaker/FormsV2`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderAdd);
    })
    for(const ui of uiBuilder.getUIs()) {
        form.button(`§b${ui.data.name}\n§r§7Normal Form`, `textures/azalea_icons/GUIMaker/FormsV2`, (player)=>{
            uiManager.open(player, config.uiNames.UIBuilderEdit, ui.id)
        })
    }
    form.show(player, false, ()=>{})
})