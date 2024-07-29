import icons from "../../api/icons";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import { prismarineDb } from "../../lib/prismarinedb";
import http from "../../networkingLibs/currentNetworkingLib";
import uiManager from "../../uiManager";
export let targetLeafDBVersion = 5.2

uiManager.addUI(config.uiNames.ConfigRoot, "Config Root", (player)=>{
    let actionForm = new ActionForm();
    let body = [];
    if(prismarineDb.version > targetLeafDBVersion || prismarineDb.version < targetLeafDBVersion)
        body.push(prismarineDb.version > targetLeafDBVersion ? `I see u are time travelling :3` : prismarineDb.version < targetLeafDBVersion ? `You are 100%% going to break something in here bro` : `idk`)
    if(http.player) {
        body.push(`§bExternal Network is setup properly. You can now get more features from Leaf Essentials`);
    }
    if(body && body.length) {
        actionForm.body(body.join('\n§r'))
    }

    actionForm.title("§t§e§s§t§rConfig UI")
    // actionForm.button(`§2Leaf Settings\n§r§7Common settings`, icons.resolve("Packs/Asteroid/jungle_leaves"), (player)=>{
    //     player.sendMessage(`§cThis feature is coming soon`);
    //     uiManager.open(player, config.uiNames.ConfigRoot)
    // })
    // actionForm.button(`§cUI Builder\n§r§7Make UIs easily!`, icons.resolve("Packs/Asteroid/ui"), (player)=>{
    //     uiManager.open(player, config.uiNames.UIBuilderRoot)
    // })
    // actionForm.button(`§6Chest GUIs\n§r§7Make Chest UIs easily!`, icons.resolve("Packs/Asteroid/chest_tappable"), (player)=>{
    //     uiManager.open(player, config.uiNames.ChestGuiRoot)
    // })
    // actionForm.button(`§bSidebar\n§r§7Make sidebars easily!`, icons.resolve(`Packs/Asteroid/beacon`), (player)=>{
    //     uiManager.open(player, config.uiNames.SidebarEditorRoot)
    // })
    // actionForm.button(`§nCurrency Editor\n§r§7idfk`, icons.resolve(`Packs/Asteroid/adventure_crystal_uncommon`), (player)=>{
    //     uiManager.open(player, config.uiNames.CurrencyEditor)
    // })
    actionForm.button(`§l§nMain Settings\n§r§7Main settings for leaf`, icons.resolve("Packs/Asteroid/slash"), (player)=>{
        uiManager.open(player, config.uiNames.ConfigMain)
    })
    actionForm.button(`§l§bMisc Settings\n§r§7Miscellaneous Settings`, icons.resolve("Packs/Asteroid/dev"), (player)=>{
        uiManager.open(player, config.uiNames.Config.Misc)
    })
    actionForm.button(`§l§aModules\n§r§7Enable/Disable Modules`, icons.resolve("leaf/image-669"), (player)=>{
        uiManager.open(player, config.uiNames.Config.Modules);
    })
    // actionForm.button(`§l§dModeration Settings\n§r§7Change moderation settings`, icons.resolve("leaf/image-613"))
    actionForm.button(`§l§eCredits\n§r§7See who helped with leaf`, icons.resolve("Packs/Asteroid/custom"), player=>{
        uiManager.open(player, config.uiNames.ConfigCredits)
    })
    if(http.player) {
        actionForm.button(`§l§9Discord Logs\n§r§7Online Exclusive`, icons.resolve(`leaf/image-0910`), (player)=>{
            
        })
    }
    actionForm.show(player, false, ()=>{})
})