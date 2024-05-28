import uiBuilder from "../../api/uiBuilder";
import config from "../../config";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderAddButton, "Add a button", (player, id, defaultText=undefined, defaultSubtext=undefined, defaultAction=undefined, defaultIcon=undefined, error=null, index = -1)=>{
    let form = new ModalForm();
    form.textField("Text§c*", "Text on the button", defaultText);
    form.textField("Subtext", "Subtext on the button", defaultSubtext);
    form.textField("Action§c*", "Example: /say hi", defaultAction);
    form.textField("Icon", "Example: vanilla/iron_sword", defaultIcon);
    form.show(player, false, (player, response)=>{
        if(response.canceled) return;
        if(!response.formValues[0]) return uiManager.open(player, config.uiNames.UIBuilderAddButton, id, response.formValues[0], response.formValues[1], response.formValues[2], response.formValues[3], "Text is required", index);
        if(!response.formValues[2]) return uiManager.open(player, config.uiNames.UIBuilderAddButton, id, response.formValues[0], response.formValues[1], response.formValues[2], response.formValues[3], "Text is required", index);
        if(index >= 0) {
            let ui = uiBuilder.db.getByID(id);
            ui.data.buttons[index].text = response.formValues[0];
            ui.data.buttons[index].subtext = response.formValues[1];
            ui.data.buttons[index].action = response.formValues[2];
            ui.data.buttons[index].iconID = response.formValues[3];
            uiBuilder.db.overwriteDataByID(id, ui.data)
            uiManager.open(player, config.uiNames.UIBuilderEditButtons, id);
            return;
        }
        uiBuilder.addButtonToUI(id, response.formValues[0], response.formValues[1], response.formValues[2], response.formValues[3]);
        uiManager.open(player, config.uiNames.UIBuilderEditButtons, id);
    })
})