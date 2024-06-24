import icons from "../../api/icons";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.PlayerShops.Root, "Player Shops", (player)=>{
    let form = new ActionForm();
    form.title("Player Shops")
    form.button("§dPlayer Shops\n§7View all player shops", icons.resolve("leaf/image-1202"))
    // form.button("§eFeatured\n§7View all featured shops", icons.resolve("leaf/image-626"))
    form.button("§aCollect\n§7Collect items & money", icons.resolve("leaf/image-630"))
    // form.button("§6Leaderboards\n§7View shop leaderboards", icons.resolve("leaf/image-068"))
    //
    //
    //
    form.show(player, false, ()=>{})
})
//image-1334