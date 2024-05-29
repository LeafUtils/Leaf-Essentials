import chestUIBuilder from "../../api/chest/chestUIBuilder";
import config from "../../config";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ChestGuiAddItem, "Add an item to a Chest GUI", (player, id, defaultItemName = "", defaultIconID = "", defaultIconLore = "", defaultAction = "", defaultAmount = 1, defaultRow = 1, defaultColumn = 1, error = "", index = -1)=>{
    let chest = chestUIBuilder.db.getByID(id);
    if(!chest) return uiManager.open(player, config.uiNames.ChestGuiRoot);
    let form = new ModalForm();
    form.title(error ? `§c${error}` : index == -1 ? "Create Item" : "Edit Item");
    form.textField("Item Name§c*", "Change the name of the item", defaultItemName); // 0
    form.textField("Icon ID§c*", "Example: vanilla/iron_sword", defaultIconID); // 1
    form.textField("Item Lore", "Comma-separated list of lore entries", defaultIconLore); // 2
    form.textField("Action§c*", "Example: /say hello, world!", defaultIconLore); // 3
    form.slider("Amount", 1, 64, 1, defaultAmount); // 4
    form.slider("Row (§eY§r)", 1, chest.data.rows, 1, defaultRow); // 5
    form.slider("Column (§9X§r)", 1, 9, 1, defaultColumn); // 6
    form.show(player, false, (player, response)=>{
        try {
            chestUIBuilder.addIconToChestGUI(id, response.formValues[5], response.formValues[6], response.formValues[1], response.formValues[0], response.formValues[2].split(','), response.formValues[4], response.formValues[3]);
            uiManager.open(player, config.uiNames.ChestGuiEditItems, id);
        } catch(e) {
            uiManager.open(player, config.uiNames.ChestGuiAddItem, id, response.formValues[0], response.formValues[1], response.formValues[2], response.formValues[3], response.formValues[4], response.formValues[5], response.formValues[6], e, index);
        }
    })
})