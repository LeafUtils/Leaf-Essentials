// Added in v0.1
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderRoot, "UI Builder Root", (player)=>{
    let form = new ActionForm();
    form.title("UI Builder");
    form.button(`§aAdd\n§7Add a UI`, `textures/azalea_icons/GUIMaker/FormsV2`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderAdd);
    })
    form.show(player, false, ()=>{})
})