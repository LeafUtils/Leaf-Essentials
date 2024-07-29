import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Config.Misc, "Misc Config", (player)=>{
    let form = new ActionForm();
    form.button("§bChat Format\n§7Advanced", null, (player)=>{
        uiManager.open(player, config.uiNames.Config.ChatrankFormat);
    });
    form.show(player, false, (player, response)=>{})
})