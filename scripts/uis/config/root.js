import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ConfigRoot, "Config Root", (player)=>{
    let actionForm = new ActionForm();
    actionForm.button(`§cUI Builder\n§r§7Make UIs easily!`, `textures/azalea_icons/GUIMaker/FormsV2`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderRoot)
    })
    actionForm.show(player, false, ()=>{})
})