import chestUIBuilder from "../../api/chest/chestUIBuilder";
import common from "../../api/chest/common";
import icons from "../../api/icons";
import translation from "../../api/translation";
import config from "../../config";
import { ChestFormData } from "../../lib/chestUI";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ChestGuiEditItems, "Edit the items in Chest GUIs", (player, id)=>{
    let chest = chestUIBuilder.db.getByID(id);
    if(!chest) return uiManager.open(player, config.uiNames.ChestGuiEditItems);
    let form = new ChestFormData((chest.data.rows * 9).toString());
    let usedSlots = [];
    for(const icon of chest.data.icons) {
        usedSlots.push(icon.slot);
        form.button(icon.slot, icon.name, icon.lore, icons.resolve(icon.iconID), icon.amount);
    }
    form.title(`Edit (${chest.data.title}§r)`)
    for(let i = 0;i < (chest.data.rows * 9);i++) {
        if(usedSlots.includes(i)) continue;
        form.button(i, `§8[§2+§8] §a§l${translation.getTranslation(player, "chestguis.additem")}`, [translation.getTranslation(player, "chestguis.additemlore.line1"), translation.getTranslation(player, "chestguis.additemlore.line2"), translation.getTranslation(player, "chestguis.additemlore.line3")], "textures/blocks/glass_lime", 1);
    }
    //player, id, defaultItemName = "", defaultIconID = "", defaultIconLore = "", defaultAction = "", defaultAmount = 1, defaultRow = 1, defaultColumn = 1, error = "", index = -1
    form.show(player).then(res=>{
        if(!usedSlots.includes(res.selection)) {
            let [row,col] = common.slotIdToRowCol(res.selection);
            return uiManager.open(player, config.uiNames.ChestGuiAddItem, id, "", "", "", "", 1, row, col);
        }
        let index = chest.data.icons.findIndex(_=>_.slot == res.selection);
        if(index > -1) {
            uiManager.open(player, config.uiNames.ChestGuiEditItem, id, index);
        }
    })
})