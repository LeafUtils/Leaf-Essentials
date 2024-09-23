import configAPI from "../../api/config/configAPI";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Config.Misc, "Misc Config", (player)=>{
    let form = new ActionForm();
    form.button("§bChat Format\n§7Advanced", null, (player)=>{
        uiManager.open(player, config.uiNames.Config.ChatrankFormat);
    });
    form.button("§cReset Chat Format\n§7reset the chat format", `textures/blocks/barrier`, (player)=>{
        configAPI.setProperty("chatformat", config.defaults.chatformat);
        uiManager.open(player, config.uiNames.Config.ChatrankFormat);
    })
    form.show(player, false, (player, response)=>{})
})