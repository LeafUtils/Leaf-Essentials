import uiBuilder from "../../api/uiBuilder";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderEditButtons, "Edit Buttons in a UI", (player, id)=>{
    let form = uiBuilder.db.getByID(id);
    let actionForm = new ActionForm();
    actionForm.button(`§nBack`, `textures/azalea_icons/2`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderEdit, id)
    })
    actionForm.button(`§aAdd Button\n§7Adds a button`, `textures/azalea_icons/1`, (player)=>{
        
    })
    actionForm.show(player, false, (player, response)=>{

    })
})