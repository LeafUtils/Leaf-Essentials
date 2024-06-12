import icons from "../../api/icons";
import config from "../../config";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ConfigRoot, "Config Root", (player)=>{
    let actionForm = new ActionForm();
    actionForm.title("§f§u§l§l§s§c§r§e§e§nConfig UI")
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
    actionForm.button(`§l§bMisc Settings\n§r§7Miscellaneous Settings`, icons.resolve("Packs/Asteroid/dev"))
    actionForm.button(`§l§aModules\n§r§7Enable/Disable Modules`, icons.resolve("Packs/Asteroid/quick_craft"))
    actionForm.button(`§l§dModeration Settings\n§r§7Change moderation settings`, icons.resolve("Packs/Asteroid/profile_glyph_color"))
    actionForm.button(`§l§eCredits\n§r§7See who helped with leaf`, icons.resolve("Packs/Asteroid/custom"))
    actionForm.show(player, false, ()=>{})
})