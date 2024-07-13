import { world, system, ScriptEventSource, Player } from '@minecraft/server';
import uiManager from './uiManager.js';
import config from './config';
import './uis/uiBuilder/root';
import './test'
import './uis/clans/root.js'
import './uis/clans/create.js'
import './uis/clans/invite.js';
import './uis/clans/viewInvites.js';
import './uis/clans/clanMembers.js';
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
import './uis/pay.js';
import './uis/sidebar/trashEdit';
import './uis/currencyEditor/root';
import './uis/currencyEditor/add';
import './crates/main';
import './uis/basic/basicConfirmation.js';
import './features/chestLocking'
import './commands/bind.js'
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
import './uis/shop/root.js';
import './uis/dailyrewards/rewards.js';
import './uis/shop/admin.js'
import './uis/shop/categoryAdmin.js';
import './uis/basic/itemSelect.js';
import './uis/help.js'
import './uis/basic/numberSelector.js';
import './uis/dailyrewards/addReward.js';
import './uis/dailyrewards/claim.js';
import './uis/dailyrewards/editReward.js';
import './uis/dailyrewards/root.js'
import './uis/shop/item.js'
import './commands/lb.js'
import './uis/gifts/add.js'
import './uis/playershops/lb.js';
import './uis/gifts/edit.js'
import './uis/gifts/redeem.js';
import './uis/events/root.js'
import './uis/gifts/root.js'
import './uis/shop/category.js';
import { createLandClaim, isOwner, vec3ToChunkCoordinates } from './landClaims.js';
import { SegmentedStoragePrismarine } from './prismarineDbStorages/segmented.js';
import OpenClanAPI from './api/OpenClanAPI.js';
import itemdb from './api/itemdb.js';
import './uis/generatorUI.js'
import lokijs from './lib/lokijs.js';
import generator from './api/generator.js';
import { uiManager as a} from '@minecraft/server-ui';
// ;
system.runTimeout(()=>{
    // OpenClanAPI.db.data = [];
    // OpenClanAPI.db.save();
    // let player = world.getPlayers().find(_=>_.name == "AnUwUFurry")
    // OpenClanAPI.createClan(player, "LEAF")
},2);
// generator.addGeneratorUpgrade(1720191503072, 2, "money", 20)
// generator.addGeneratorUpgrade(1720191503072, 1, "money", 40)
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
commandManager.addCommand("emojis",{description:"Get a list of emojis"},({msg,args})=>{
    let text = [];
    for(const key in emojis) {
        text.push(`:${key}: ${emojis[key]}`);
    }
    msg.sender.sendMessage(text.join('\n§r'))
})
commandManager.addCommand("land",{description:"Testing for claims"},({msg,args})=>{
})
commandManager.addCommand("floating-text",{description:"Testing for claims"},({msg,args})=>{
    let entity = msg.sender.dimension.spawnEntity("leaf:floating_text", msg.sender.location)
    entity.nameTag = args.join(' ').replace(/\\n/g,"\n")
})
commandManager.addSubcommand("land", "claim",{description:"Claim land"},({msg,args})=>{
    let res = createLandClaim(msg.sender);
    if(!res) return msg.sender.error("Could not create claim")
    msg.sender.success("Successfully created claim!")
})
// commandManager.addSubcommand("add",{description:"Add person to edit a chunk"},({msg,args})=>{
    // let player;
    // for(const player2 of world.getPlayers()) {
    //     if(player2.name.toLowerCase() == args.join(' ').toLowerCase()) player = player2;
    // }
    // if(!player) return msg.sender.error("Player not found");
    // if(!isOwner(msg.sender, vec3ToChunkCoordinates(msg.sender.location), true)) return msg.sender.error("You are not the owner of this claim");

    // let res = createLandClaim(msg.sender);
    // if(!res) return msg.sender.error("Could not create claim")
    // msg.sender.success("Successfully created claim!")
// })
// OpenClanAPI.createClan(world.getPlayers().find(_=>_.name == "AnUwUFurry"), "LEAF");

commandManager.addCommand("pay",{description:"Pay command"},({msg,args})=>{
    msg.sender.success("Close chat and move to open UI");
    let ticks = 0;
    let loc = {x:msg.sender.location.x,y:msg.sender.location.y,z:msg.sender.location.z};
    let interval = system.runInterval(()=>{
        ticks++;
        if(ticks >= (20 * 10)) {
            system.clearRun(interval);
            msg.sender.error("Timed out")
            return;
        }
        if(msg.sender.location.x != loc.x || msg.sender.location.y != loc.y || msg.sender.location.z != loc.z) {
            system.clearRun(interval);
            uiManager.open(msg.sender, config.uiNames.Pay)
        }
    });
})
commandManager.addCommand("redeem",{description:"Redeem codes"},({msg,args})=>{
    msg.sender.success("Close chat and move to open UI");
    let ticks = 0;
    let loc = {x:msg.sender.location.x,y:msg.sender.location.y,z:msg.sender.location.z};
    let interval = system.runInterval(()=>{
        ticks++;
        if(ticks >= (20 * 10)) {
            system.clearRun(interval);
            msg.sender.error("Timed out")
            return;
        }
        if(msg.sender.location.x != loc.x || msg.sender.location.y != loc.y || msg.sender.location.z != loc.z) {
            system.clearRun(interval);
            uiManager.open(msg.sender, config.uiNames.Gifts.Redeem)
        }
    });
})
commandManager.addCommand("shop",{description:"Open shop UI"},({msg,args})=>{
    msg.sender.success("Close chat and move to open UI");
    let ticks = 0;
    let loc = {x:msg.sender.location.x,y:msg.sender.location.y,z:msg.sender.location.z};
    let interval = system.runInterval(()=>{
        ticks++;
        if(ticks >= (20 * 10)) {
            system.clearRun(interval);
            msg.sender.error("Timed out")
            return;
        }
        if(msg.sender.location.x != loc.x || msg.sender.location.y != loc.y || msg.sender.location.z != loc.z) {
            system.clearRun(interval);
            uiManager.open(msg.sender, config.uiNames.Shop.Root)
        }
    });
})
// import './matrix-anticheat/anticheat'
// world.sendMessage(performance.now())
// icons.install(azaleaIconPack, true)
icons.install(leafIconPack);
icons.install(leafIconPack2, true);
function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];
    
    do {
        var match = myRegexp.exec(myString);
        if (match != null)
        {
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    return myArray;
}

system.afterEvents.scriptEventReceive.subscribe(e=>{
    if(
        e.id == config.scripteventNames.openDefaultLegacy &&
        e.sourceType == ScriptEventSource.Entity &&
        e.sourceEntity.typeId == "minecraft:player"
    ) {
        let args = betterArgs(e.message);
        uiManager.open(e.sourceEntity, args[0], ...args.slice(1))
    }
    if(e.id.startsWith(config.scripteventNames.openDefault) &&e.sourceType == ScriptEventSource.Entity &&
    e.sourceEntity.typeId == "minecraft:player") {
        let args = betterArgs(e.message);
        let args2 = args.length && args[0] ? args : [];
        uiManager.open(e.sourceEntity, e.id.substring(config.scripteventNames.openDefault.length), ...args2);
    }
})
let recordsDb = prismarineDb.customStorage("Records", SegmentedStoragePrismarine);
// world.sendMessage(JSON.stringify(recordsDb.data).length.toString())
// world.afterEvents.playerSpawn.subscribe(e=>{
//     if(!e.initialSpawn) return;
//     recordsDb.insertDocument({
//         type: "JOIN",
//         at: Date.now(),
//         player: e.player.name
//     })
// })
// world.afterEvents.playerLeave.subscribe(e=>{
//     recordsDb.insertDocument({
//         type: "LEAVE",
//         at: Date.now(),
//         player: e.playerName
//     })
// })
OpenClanAPI.onClanMessage((player2, clanID, message)=>{
    let clan = OpenClanAPI.db.getByID(clanID);
    let pre = playerStorage.getID(player2) == clan.data.owner ? ":small_diamond: " : ""
    for(const player of world.getPlayers()) {
        if(OpenClanAPI.getClan(player).id == clanID) {
            player.sendMessage(
                formatStr(`${pre}§8[ §r{{clan "§a[@CLAN]"}} §r§8] §r§e<name> §r§8<dra> §r§7<msg>`, player2, {msg: message})
            )
        }
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
        if(e.sender.hasTag("clan-chat")) {
            let clan = OpenClanAPI.getClan(e.sender)
            if(clan) {
                OpenClanAPI.clanSendMessage(e.sender, clan.id, e.message);
                return;
            }
        }
        createMessage(e.sender, e.message);
    }
})
world.afterEvents.itemUse.subscribe(e=>{
    if(e.source.typeId == "minecraft:player" && e.itemStack.typeId == config.items.LeafConfig && prismarineDb.permissions.hasPermission(e.source, "configui.open")) {
        uiManager.open(e.source, config.uiNames.ConfigRoot)
    }
    if(e.source.typeId == "minecraft:player" && e.itemStack.typeId == "leaf:shop") {
        uiManager.open(e.source, config.uiNames.Shop.Root)
    }
    if(e.source.typeId == "minecraft:player" && e.itemStack.typeId == "leaf:player_shop") {
        uiManager.open(e.source, config.uiNames.PlayerShops.Root)
    }
})
world.afterEvents.playerSpawn.subscribe(e=>{
    if(!e.initialSpawn) return;
    let rewards = playerStorage.getRewards(playerStorage.getID(e.player));
    let displayText = {};
    let total = 0;
    for(const reward of rewards) {
        if(prismarineDb.economy.getCurrency(reward.currency)) {
            let currency = prismarineDb.economy.getCurrency(reward.currency);
            total += reward.amount;
            prismarineDb.economy.addMoney(e.player, reward.amount, currency.scoreboard);
            if(displayText[currency.symbol]) displayText[currency.symbol] += reward.amount
            else displayText[currency.symbol] = reward.amount;
        }
    }
    let displayText2 = [];
    for(const text in displayText) {
        displayText2.push(`${text} ${displayText[text]}`)
    }
    if(total) e.player.sendMessage(`§aWelcome back! While you were gone you have earned: §f${displayText2.join('§7, §r')}`);
    playerStorage.clearRewards(playerStorage.getID(e.player));
})
system.afterEvents.scriptEventReceive.subscribe(e=>{
    if(e.id == "leaf:icon_viewer") {
        uiManager.open(e.sourceEntity, config.uiNames.IconViewer, 0, (player, iconID)=>{
            world.sendMessage(iconID);
        })
    }
})
// THE ONLY TICK EVENT THAT IS ALLOWED. DO NOT ADD MORE
let ticks = 0;
system.runInterval(()=>{
    ticks++;
    if(ticks > 2000000000) ticks = 0;
    if(ticks % (20*40) == 0) {
        for(const player of world.getPlayers()) playerStorage.saveData(player);
    }
},1);
// world.afterEvents.entitySpawn.subscribe(e=>{
    // if(e.entity.typeId == "leaf:floating_text") {
    //     e.entity.remove();
    // }
// })
commandManager.addCommand("testy", {description:"testing itemDb"}, ({msg, args})=>{
    if(msg.sender.name != "AnUwUFurry") return msg.sender.error("Dont fuck shitt up :(");
    if(args[0] == "save") {
        let inv = msg.sender.getComponent('inventory');
        let item = inv.container.getItem(msg.sender.selectedSlotIndex);
        let [stash, slot] = itemdb.saveItem(item);
        msg.sender.sendMessage(`Stash: ${stash} / Slot: ${slot}`);
    } else if(args[0] == "load") {
        let inv = msg.sender.getComponent('inventory');
        let stash = parseInt(args[1]);
        let slot = parseInt(args[2]);
        let item = itemdb.getItem(stash, slot);
        inv.container.addItem(item);
    }
})
world.afterEvents.playerSpawn.subscribe(e=>{
    playerStorage.saveData(e.player);
})
world.beforeEvents.playerLeave.subscribe(e=>{
    playerStorage.saveData(e.player);
})
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
// commandManager.addCommand("test", {}, ({msg,args})=>{
//     leaderboardHandler.addLeaderboard("money", msg.sender.location)
// })
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