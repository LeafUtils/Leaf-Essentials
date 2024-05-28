import { world, system, ScriptEventSource } from '@minecraft/server';
import uiManager from './uiManager';
import config from './config';
import './uis/uiBuilder/root';
import './uis/uiBuilder/add';
import './uis/uiBuilder/edit';
import './uis/uiBuilder/editButtons';
import './uis/uiBuilder/addButton';
import './uis/uiBuilder/editButton';
import './commands/help';
import './commands/uisList';
import icons from './api/icons';
import azaleaIconPack from './icon_packs/azalea';
import commandManager from './api/commands/commandManager';
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
    }
})
// let id = uiBuilder.createUI("test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit", "normal", "test");
// uiBuilder.addButtonToUI(
//     id,
//     "Test",
//     "Working on UI maker",
//     "/say hi",
//     "vanilla/iron_sword"
// )