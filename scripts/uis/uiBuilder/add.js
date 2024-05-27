import uiBuilder from "../../api/uiBuilder";
import config from "../../config";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderAdd, "Add a UI", (player)=>{
    let modalForm = new ModalForm();
    modalForm.textField("Title§c*", "Type a title here");
    modalForm.textField("Body", "Type a body here");
    modalForm.textField("Scriptevent", `/scriptevent ${config.scripteventNames.open} <scriptevent>`);
    modalForm.show(player, false, (player, response)=>{

    })
})