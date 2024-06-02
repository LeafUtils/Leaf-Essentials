import sidebarEditor from "../../api/sidebarEditor";
import config from "../../config";
import uiManager from "../../uiManager";
import { ActionForm, ModalForm } from "../../lib/form_func";
import { prismarineDb } from "../../lib/prismarinedb";
import { sidebarConfig } from "../../configs";
import { formatStr } from "../../api/azaleaFormatting";
uiManager.addUI(config.uiNames.SidebarEditorEdit, "Sidebar editor root", (player, sidebarName)=>{
    let form = new ActionForm();
    form.button("Add line", "textures/azalea_icons/1", (player)=>{
        uiManager.open(player, config.uiNames.SidebarEditorAddLine, sidebarName);
    })
    for(const line of sidebarEditor.getLines(sidebarName)) {
        form.button(sidebarEditor.parseLine(player, line.text), undefined, (player)=>{
            uiManager.open(player, config.uiNames.SidebarEditorAddLine, sidebarName, line.id)
        })
    }
    form.show(player, false, (player, response)=>{})
})