import { world, system, ScriptEventSource, Player } from '@minecraft/server';
import uiManager from './uiManager.js';
import config from './config';
import './uis/uiBuilder/root';
import './uis/uiBuilder/add';
import './uis/uiBuilder/edit';
import './uis/uiBuilder/editButtons';
import './uis/uiBuilder/addButton';
import './uis/uiBuilder/editButton';
import './uis/config/root'
import './uis/config/main'
import './uis/config/credits.js'
import './commands/help';
import './commands/uisList';
import './commands/warp.js'
import './commands/speakas.js';
import './uis/chests/root';
import './uis/chests/add';
import './uis/chests/edit';
import './uis/chests/editItems';
import './uis/chests/addItem';
import './uis/chests/editItem';
import './uis/sidebar/root';
import './uis/sidebar/add';
import './uis/sidebar/settings';
import './uis/sidebar/edit';
import './uis/sidebar/addLine';
import './uis/sidebar/editLine';
import './api/sidebarDisplay';
import './uis/uiBuilder/onlineGuis.js';
import './uis/sidebar/trash';
import './uis/sidebar/trashEdit';
import './uis/currencyEditor/root';
import './uis/currencyEditor/add';
import './crates/main';
import './uis/basic/basicConfirmation.js';
import './features/chestLocking'
import icons from './api/icons';
import azaleaIconPack from './icon_packs/azalea';
import commandManager from './api/commands/commandManager';
import chestUIBuilder from './api/chest/chestUIBuilder';
import { formatStr } from './api/azaleaFormatting';
import playerStorage from './api/playerStorage';
import { generalConfig } from './configs';
import './combatLog';
import './uis/blockEditor.js';
import './uis/entityEditor.js';
import { prismarineDb } from './lib/prismarinedb.js';
import emojis from './api/emojis.js';
import './networkingLibs/currentNetworkingLib.js'
import { leafIconPack, leafIconPack2 } from './icon_packs/leaf.js';
import './uis/playershops/root.js'
import { createMessage } from './createMessage.js';
import translation from './api/translation.js';
import http from './networkingLibs/currentNetworkingLib.js';
import leaderboardHandler from './leaderboardHandler.js';
import './api/iconViewer/root.js'
Player.prototype.info = function(msg) {
    this.sendMessage(translation.getTranslation(this, "info", msg));
}
Player.prototype.success = function(msg) {
    this.sendMessage(translation.getTranslation(this, "success", msg));
}
Player.prototype.error = function(msg) {
    this.sendMessage(translation.getTranslation(this, "error", msg));
}
Player.prototype.warn = function(msg) {
    this.sendMessage(translation.getTranslation(this, "warn", msg));
}

// import './matrix-anticheat/anticheat'
// world.sendMessage(performance.now())
// icons.install(azaleaIconPack, true)
icons.install(leafIconPack);
icons.install(leafIconPack2, true);
system.afterEvents.scriptEventReceive.subscribe(e=>{
    if(
        e.id == config.scripteventNames.openDefault &&
        e.sourceType == ScriptEventSource.Entity &&
        e.sourceEntity.typeId == "minecraft:player"
    ) {
        uiManager.open(e.sourceEntity, e.message)
    }
})
world.beforeEvents.chatSend.subscribe(e=>{
    if(e.message.startsWith('!')) {
        e.cancel = true;
        commandManager.run(e)
        return;
    }
    if(generalConfig.get("ChatRanks") ? true : false) {
        e.cancel = true;
        if(e.message.startsWith('.') && config.HTTPEnabled) return;
        createMessage(e.sender, e.message);
    }
})
world.afterEvents.itemUse.subscribe(e=>{
    if(e.source.typeId == "minecraft:player" && e.itemStack.typeId == config.items.LeafConfig && prismarineDb.permissions.hasPermission(e.source, "configui.open")) {
        uiManager.open(e.source, config.uiNames.ConfigRoot)
    }
    if(e.source.typeId == "minecraft:player" && e.itemStack.typeId == "minecraft:flint") {
        uiManager.open(e.source, config.uiNames.PlayerShops.Root)
    }
})
system.afterEvents.scriptEventReceive.subscribe(e=>{
    if(e.id == "a:a") {
        uiManager.open(e.sourceEntity, config.uiNames.IconViewer, 0, (player, iconID)=>{
            world.sendMessage(iconID);
        })
    }
})
// THE ONLY TICK EVENT THAT IS ALLOWED. DO NOT ADD MORE
let ticks = 0;
system.runInterval(()=>{
    ticks++;
    if(ticks % 20 == 0) {
        for(const player of world.getPlayers()) playerStorage.saveData(player);
    }
},1);
// let id = chestUIBuilder.createChestGUI("test", "test", 3);
// chestUIBuilder.addIconToChestGUI(id, 2, 5, "apple", "test", ["hello","world"], 2, "/say hi");
// let id = uiBuilder.createUI("test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit", "normal", "test");
// uiBuilder.addButtonToUI(
//     id,
//     "Test",
//     "Working on UI maker",
//     "/say hi",
//     "vanilla/iron_sword"
// )

// most useless code ever
system.run(()=>{
    let defaultCurrency = prismarineDb.economy.getCurrency("default");
    if(defaultCurrency && defaultCurrency.symbol == "$") {
        prismarineDb.economy.editSymbol(defaultCurrency.scoreboard, emojis.coins);
    }
})
commandManager.addCommand("test", {}, ({msg,args})=>{
    leaderboardHandler.addLeaderboard("money", msg.sender.location)
})
// world.afterEvents.playerSpawn.subscribe(e=>{
//     if(http.player && config.DiscordLoggingWebhook) {
//         http.makeRequest({
//             method: 'post',
//             url: config.DiscordLoggingWebhook,
//             data: {
//                 avatar_url: config.Discord.AvatarURL,
//                 username: config.Discord.Username,
//                 embeds: [
//                     {
//                         color: 0x8BC34A,
//                         description: `**\`${e.player.name}\`** has joined`
//                     }
//                 ]
//             }
//         })
//     }
// })
// world.afterEvents.playerLeave.subscribe(e=>{
//     if(http.player && config.DiscordLoggingWebhook) {
//         http.makeRequest({
//             method: 'post',
//             url: config.DiscordLoggingWebhook,
//             data: {
//                 avatar_url: config.Discord.AvatarURL,
//                 username: config.Discord.Username,
//                 embeds: [
//                     {
//                         color: 0xFF7043,
//                         description: `**\`${e.playerName}\`** has left`
//                     }
//                 ]
//             }
//         })
//     }
// })