import { ChestFormData } from "../../lib/chestUI";
import actionParser from "../actionParser";
import icons from "../icons";

class ChestGUIOpener {
    open(form, player) {
        let chest = new ChestFormData(form.rows == 0.5 ? "5" : (form.rows * 9).toString());
        chest.title(form.title);
        for(const icon of form.icons) {
            chest.button(icon.slot, icon.name, icon.lore ? icon.lore : [], icons.resolve(icon.iconID), icon.amount);
        }
        chest.show(player).then(res=>{
            if(res.canceled) return;
            let icon = form.icons.find(_=>_.slot == res.selection);
            if(icon) {
                actionParser.runAction(player, icon.action);
            }
        })
        // {
        //     row,
        //     col,
        //     iconID,
        //     name,
        //     lore,
        //     amount: itemStackAmount
        // }
    }
}

export default new ChestGUIOpener();