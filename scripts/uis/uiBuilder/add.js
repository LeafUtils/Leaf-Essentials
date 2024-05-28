// Added in v0.1
import translation from "../../api/translation";
import uiBuilder from "../../api/uiBuilder";
import config from "../../config";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderAdd, "Add a UI", (player, defaultTitle = undefined, defaultBody = undefined, defaultScriptevent = undefined, error = undefined, id = undefined)=>{
    let modalForm = new ModalForm();
    modalForm.title(error ? `§c${error}` : translation.getTranslation(player, "uibuilder.createui"))
    modalForm.textField(`${translation.getTranslation(player, "uibuilder.title")}§c*`, translation.getTranslation(player, "uibuilder.titleplaceholder"), defaultTitle);
    modalForm.textField(translation.getTranslation(player, "uibuilder.body"), translation.getTranslation(player, "uibuilder.bodyplaceholder"), defaultBody);
    modalForm.textField(`${translation.getTranslation(player, "uibuilder.scriptevent")}§c*`, `/scriptevent ${config.scripteventNames.open} <scriptevent>`, defaultScriptevent);
    modalForm.submitButton(translation.getTranslation(player, "uibuilder.createui"));
    modalForm.show(player, false, (player, response)=>{
        if(!response.formValues[0]) return uiManager.open(player, config.uiNames.UIBuilderAdd, response.formValues[0], response.formValues[1], response.formValues[2], translation.getTranslation(player, "uibuilder.errors.titleundefined"));
        if(!response.formValues[2]) return uiManager.open(player, config.uiNames.UIBuilderAdd, response.formValues[0], response.formValues[1], response.formValues[2], translation.getTranslation(player, "uibuilder.errors.scripteventundefined"));
        if(id) {
            let ui = uiBuilder.db.getByID(id);
            if(!ui) return;
            ui.data.name = response.formValues[0];
            ui.data.body = response.formValues[1];
            ui.data.scriptevent = response.formValues[2];
            uiBuilder.db.overwriteDataByID(id, ui.data);
            uiManager.open(player, config.uiNames.UIBuilderRoot);
            return;
        }
        uiBuilder.createUI(response.formValues[0], response.formValues[1], "normal", response.formValues[2]);
        uiManager.open(player, config.uiNames.UIBuilderRoot);
    })
})