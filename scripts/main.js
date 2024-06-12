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
import './commands/help';
import './commands/uisList';
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
import './uis/sidebar/trash';
import './uis/sidebar/trashEdit';
import './uis/currencyEditor/root';
import './uis/currencyEditor/add';
import './crates/main';
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
// import './matrix-anticheat/anticheat'
// world.sendMessage(performance.now())
icons.install(azaleaIconPack, true)
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
        world.sendMessage(
            formatStr(
                // `{{has_tag staffchat "<bc>[<nc>StaffChat<bc>] " "<bl>"}}§r<bc>[<rc>{{rank_joiner "<drj>"}}§r<bc>] §r<nc><name> §r<bc><dra> §r<mc><msg>`,
                `{{has_tag staffchat "<bc>[<nc> StaffChat §r<bc>] " "<bl>"}}§r<bc>[ <rc>{{rank_joiner "<drj>"}}§r<bc> ] §r<nc><name> §r§l<bc><dra> §r<mc><msg>`,
                e.sender,
                {
                    msg: e.message,
                    rc: "§7"
                }
            )
        )
    }
})
world.afterEvents.itemUse.subscribe(e=>{
    if(e.source.typeId == "minecraft:player" && e.itemStack.typeId == config.items.LeafConfig) {
        uiManager.open(e.source, config.uiNames.ConfigRoot)
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
system.run(()=>{
    let defaultCurrency = prismarineDb.economy.getCurrency("default");
    if(defaultCurrency && defaultCurrency.symbol == "$") {
        prismarineDb.economy.editSymbol(defaultCurrency.scoreboard, emojis.coins);
    }
})