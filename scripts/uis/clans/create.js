import OpenClanAPI from "../../api/OpenClanAPI";
import config from "../../config";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.Clans.Create, "Create a clan", (player, defaultValue = null, error = null)=>{
    let modal = new ModalForm();
    modal.textField(`${error ? `§c${error}\n\n` : ``}Name (a-z A-Z 0-9)`, "leaf")
    modal.show(player, false, (player, response)=>{
        if(response.canceled) return;
        try {
            let clan = OpenClanAPI.createClan(player, response.formValues[0]);
            uiManager.open(player, config.uiNames.Clans.Root);
        } catch(e) {
            uiManager.open(player, config.uiNames.Clans.Create, response.formValues[0], e)
        }
    })
})