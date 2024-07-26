import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ConfigCredits, "Credits", (player)=>{
    let form = new ActionForm();
    form.button("§dTheLegendaryTrashCan\n§7Main Developer", `textures/minidevs/trash2024`, (player)=>{
        uiManager.open(player, config.uiNames.ConfigRoot);
    })
    form.button("§eAsteroid3946\n§7Designer", `textures/minidevs/Astroidboi`, (player)=>{
        uiManager.open(player, config.uiNames.ConfigRoot);
    })
    form.button("§aRexy Cloudy\n§7Fortnite balls", `textures/minidevs/icon`, (player)=>{
        uiManager.open(player, config.uiNames.ConfigRoot);
    })
    form.show(player, false, ()=>{})
})