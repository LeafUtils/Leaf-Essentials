import uiBuilder from "../../api/uiBuilder";
import config from "../../config"
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderEdit, "UI Builder Edit", (player, id)=>{
    let doc = uiBuilder.db.getByID(id);
    if(!doc) return;
    let actionForm = new ActionForm();
    actionForm.title(`§rEditing "§b${doc.data.name}§r"`)
    actionForm.button(`§eEdit Buttons\n§7Move, edit, and remove buttons`, `textures/azalea_icons/ClickyClick`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderEditButtons, id);
    });
    actionForm.button(`§eEdit Form\n§7Edit form name, and more`, `textures/azalea_icons/GUIMaker/FormsV2`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderAdd, doc.data.name, doc.data.body, doc.data.scriptevent, undefined, doc.id);
    });
    actionForm.show(player, false, (player, response)=>{

    })
});