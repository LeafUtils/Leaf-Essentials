import chestUIBuilder from "../../api/chest/chestUIBuilder";
import config from "../../config";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ChestGuiAdd, "Chest GUI Add", (player, defaultTitle = "", defaultScriptevent = "", defaultRows = 3, error = null, index = -1)=>{
    let modal = new ModalForm();
    modal.title("Create Chest GUI");
    modal.title(error ? `§c${error}` : index == -1 ? "Create Chest GUI" : "Edit Chest GUI");
    modal.textField("Title§c*", "Example Form", defaultTitle);
    modal.textField("Scriptevent§c*", `/scriptevent ${config.scripteventNames.open} <scriptevent>`, defaultScriptevent);
    modal.slider("Rows§c*§r§f", 1, 6, 1, defaultRows);
    // modal.textField("§c*", `/scriptevent ${config.scripteventNames.open} <scriptevent>`);
    modal.show(player, false, (player, response)=>{
        if(!response.formValues[0]) return uiManager.open(player, config.uiNames.ChestGuiAdd, response.formValues[0], response.formValues[1], response.formValues[2], "Title cant be empty");
        if(!response.formValues[1]) return uiManager.open(player, config.uiNames.ChestGuiAdd, response.formValues[0], response.formValues[1], response.formValues[2], "Scriptevent cant be empty");
        chestUIBuilder.createChestGUI(response.formValues[0], response.formValues[1], response.formValues[2]);
        uiManager.open(player, config.uiNames.ChestGuiRoot)
    })
})