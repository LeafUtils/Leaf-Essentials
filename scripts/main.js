import { system, ScriptEventSource } from '@minecraft/server';
import uiManager from './uiManager';
import config from './config';
import './uis/uiBuilder/root';
import './uis/uiBuilder/add';
system.afterEvents.scriptEventReceive.subscribe(e=>{
    if(
        e.id == config.scripteventNames.openDefault &&
        e.sourceType == ScriptEventSource.Entity &&
        e.sourceEntity.typeId == "minecraft:player"
    ) {
        uiManager.open(e.sourceEntity, e.message)
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