import chestUIBuilder from "../../api/chest/chestUIBuilder";
import icons from "../../api/icons";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ChestGuiEdit, "Edit Chest GUIs", (player, id)=>{
    let chest = chestUIBuilder.db.getByID(id);
    if(!chest) return uiManager.open(player, config.uiNames.ChestGuiRoot);
    let form = new ActionForm();
    form.title(`Edit (${chest.data.title}§r)`)
    form.button("§eEdit Properties\n§r§7Edit title and more", icons.resolve("Packs/Asteroid/change"), (player)=>{
        
    })
    form.button("§aEdit Items\n§r§7Edit all the items", icons.resolve("Packs/Asteroid/keeper_boost_2"), (player)=>{
        uiManager.open(player, config.uiNames.ChestGuiEditItems, id)
    })
    form.show(player, false, ()=>{})
})