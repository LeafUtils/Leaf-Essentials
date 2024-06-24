import icons from "../../api/icons";
import config from "../../config";
import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ConfigMain, "Config Main", (player)=>{
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§r§nMain Settings")
    form.button(`§l§cGUI Maker\n§r§7Make GUIs`, icons.resolve("Packs/Asteroid/ui"), (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderRoot)
    })
    form.button(`§l§eChest Maker\n§r§7Make GUIs`, icons.resolve("leaf/image-629"), (player)=>{
        uiManager.open(player, config.uiNames.ChestGuiRoot)
    })
    form.button(`§l§qSidebar Editor\n§r§7Make Custom Sidebars Easily`, icons.resolve("leaf/image-627"), (player)=>{
        uiManager.open(player, config.uiNames.SidebarEditorRoot)
    })
    // form.button(`§l§bLeaderboards\n§r§7Configure Leaderboards`, icons.resolve("Packs/Asteroid/beacon"), (player)=>{

    // })
    // form.button(`§l§6Bounty Settings\n§r§7Configure Bounties`, icons.resolve("Packs/Asteroid/adventure_chest_legendary"), (player)=>{

    // })
    // form.button(`§l§bCrate Settings\n§r§7Crate and mange crates`, icons.resolve("Packs/Asteroid/chest_tappable"), (player)=>{

    // })
    // form.button(`§l§3PVP Settings\n§r§7Configure pvp settings`, icons.resolve("Packs/Asteroid/random6"), (player)=>{

    // })
    // form.button(`§l§cAnti Cheat\n§r§7Configure ant cheat`, icons.resolve("Packs/Asteroid/smithing_icon"), (player)=>{

    // })
    // form.button(`§l§fPlayer Settings\n§r§7Configure ant cheat`, icons.resolve("Packs/Asteroid/custom"), (player)=>{

    // })
    // form.button(`§l§gChat Settings\n§r§7Configure ant cheat`, icons.resolve("Packs/Asteroid/cluckshroom"), (player)=>{

    // })
    // form.button(`§l§5Custom Commands\n§r§7!myshittycommand`, icons.resolve("Packs/Asteroid/change"), (player)=>{

    // })
    // form.button(`§l§dVerification Settings\n§r§7Stop annoying kids from joining`, icons.resolve("Packs/Asteroid/adventure_crystal_epic"), (player)=>{

    // })
    // form.button(`§l§aWarp Settings\n§r§7Warp`, icons.resolve("Packs/Asteroid/global"), (player)=>{

    // })
    // form.button(`§l§nBank Settings\n§r§7Banky wanky`, icons.resolve("Packs/Asteroid/vault"), (player)=>{

    // })
    // form.button(`§l§qAuction House\n§7Manage auction house`, icons.resolve("Packs/Asteroid/random19"), (player)=>{

    // })

    // form.button(`§l§aCurrency Settings\n§7Manage currencies`, icons.resolve("leaf/image-481"), (player)=>{
    //     uiManager.open(player, config.uiNames.CurrencyEditor)
    // })
    form.show(player)
})