import icons from "../../api/icons";
import config from "../../config";
import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.ConfigMain, "Config Main", (player)=>{
    let form = new ActionForm();
    form.title("§f§u§l§l§s§c§r§e§e§n§r§nMain Settings")
    form.button(`§l§aGet Help\n§r§7Full documentation for leaf`, icons.resolve(`leaf/image-1191`), (player)=>{
        uiManager.open(player, config.uiNames.Help)
    })
    form.button(`§l§cGUI Maker\n§r§7Make GUIs`, icons.resolve("Packs/Asteroid/ui"), (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderRoot)
    })
    form.button(`§l§eChest Maker\n§r§7Make GUIs`, icons.resolve("leaf/image-629"), (player)=>{
        uiManager.open(player, config.uiNames.ChestGuiRoot)
    })
    form.button(`§l§qSidebar Editor\n§r§7Make Custom Sidebars Easily`, icons.resolve("leaf/image-627"), (player)=>{
        uiManager.open(player, config.uiNames.SidebarEditorRoot)
    })
    form.button(`§l§6Gift Codes\n§r§7Make gift codes people can redeem`, icons.resolve("leaf/image-630"), (player)=>{
        uiManager.open(player, config.uiNames.Gifts.Root)
    })
    form.button(`§l§nGenerator Settings\n§r§7Make high quality custom generators`, icons.resolve("leaf/image-045"), (player)=>{
        uiManager.open(player, config.uiNames.Generator.EditRoot)
    })
    form.button(`§l§bDaily Rewards\n§r§7Give players daily rewards`, icons.resolve("Packs/Asteroid/winPING"), (player)=>{
        uiManager.open(player, config.uiNames.DailyRewards.Root, "REWARDS")
    })
    form.button(`§l§bWeekly Rewards\n§r§7Give players weekly rewards`, icons.resolve("Packs/Asteroid/winPING"), (player)=>{
        uiManager.open(player, config.uiNames.DailyRewards.Root, "REWARDS_WEEKLY")
    })
    form.button(`§l§bMonthly Rewards\n§r§7Give players monthly rewards`, icons.resolve("Packs/Asteroid/winPING"), (player)=>{
        uiManager.open(player, config.uiNames.DailyRewards.Root, "REWARDS_MONTHLY")
    })
    // form.button(`§l§bLeaderboards\n§r§7Configure Leaderboards`, icons.resolve("Packs/Asteroid/beacon"), (player)=>{

    // })





    // form.button(`§l§6Bounty Settings\n§r§7Configure Bounties`, icons.resolve("leaf/image-0909"), (player)=>{

    // })
    // form.button(`§l§bCrate Settings\n§r§7Crate and mange crates`, icons.resolve("leaf/image-630"), (player)=>{

    // })





    // form.button(`§l§3PVP Settings\n§r§7Configure pvp settings`, icons.resolve("Packs/Asteroid/random6"), (player)=>{

    // })
    // form.button(`§l§cAnti Cheat\n§r§7Configure ant cheat`, icons.resolve("Packs/Asteroid/smithing_icon"), (player)=>{

    // })







    // form.button(`§l§fPlayer Settings\n§r§7Configure player settings`, icons.resolve("Packs/Asteroid/custom"), (player)=>{

    // })
    // form.button(`§l§gChat Settings\n§r§7Configure chat`, icons.resolve("leaf/image-640"), (player)=>{

    // })
    // form.button(`§l§5Custom Commands\n§r§7Make commands like !myshittycommand`, icons.resolve("leaf/image-1199"), (player)=>{

    // })





    

    // form.button(`§l§dVerification Settings\n§r§7Stop annoying kids from joining`, icons.resolve("Packs/Asteroid/adventure_crystal_epic"), (player)=>{

    // })
    // form.button(`§l§aWarp Settings\n§r§7Warp`, icons.resolve("Packs/Asteroid/global"), (player)=>{

    // })
    // form.button(`§l§nBank Settings\n§r§7Banky wanky`, icons.resolve("Packs/Asteroid/vault"), (player)=>{

    // })
    // form.button(`§l§qAuction House\n§7Manage auction house`, icons.resolve("Packs/Asteroid/random19"), (player)=>{

    // })
    form.button(`§l§eEvents\n§r§7Events`, icons.resolve("leaf/image-481"), (player)=>{
        uiManager.open(player, config.uiNames.Events.EventsRoot)
    })
    form.button(`§l§aCurrency Settings\n§r§7Manage currencies`, icons.resolve("leaf/image-481"), (player)=>{
        uiManager.open(player, config.uiNames.CurrencyEditor)
    })
    form.show(player)
})