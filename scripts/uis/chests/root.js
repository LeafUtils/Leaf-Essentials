import chestUIBuilder from "../../api/chest/chestUIBuilder";
import icons from "../../api/icons";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";
let icons2 = new Map([
    [1,"Packs/Asteroid/adventure_chest_common"],
    [2,"Packs/Asteroid/adventure_chest_uncommon"],
    [3,"Packs/Asteroid/adventure_chest_rare"],
    [4,"Packs/Asteroid/adventure_chest_epic"],
    [5,"Packs/Asteroid/adventure_chest_epic"],
    [6,"Packs/Asteroid/adventure_chest_legendary"]
])
uiManager.addUI(config.uiNames.ChestGuiRoot, "Chest GUI Root", (player)=>{
    let chests = chestUIBuilder.db.findDocuments(null);
    let form = new ActionForm();
    form.button("§aCreate Chest GUI\n§r§7Add a Chest GUI", `textures/azalea_icons/1`, (player)=>{
        uiManager.open(player, config.uiNames.ChestGuiAdd);
    })
    for(const chest of chests) {
        form.button(`§6${chest.data.title}\n§r§7${chest.data.rows} ${chest.data.rows > 1 ? "rows" : "row"}`, icons.resolve(icons2.get(chest.data.rows)), (player)=>{

        });
    }
    form.show(player, false, ()=>{})
})