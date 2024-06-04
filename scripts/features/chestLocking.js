import { system, world } from "@minecraft/server";
import { prismarineDb } from "../lib/prismarinedb";
import playerStorage from "../api/playerStorage";
// const blockDb = prismarineDb.table("BlockDB");
// function vec3ToString(vec3) {
//     return `${vec3.x},${vec3.y},${vec3.z}`;
// }
// function stringToVec3(string) {
//     return `${parseFloat(string.split(',')[0])},${parseFloat(string.split(',')[1])},${parseFloat(string.split(',')[2])}`
// }
// world.afterEvents.playerPlaceBlock.subscribe(e=>{
//     if(e.block.typeId != "minecraft:chest") return;
//     if(!e.player.hasTag("leaf:chest-lock-tip")) {
//         e.player.sendMessage("§bTIP: §fYou can interact with the chest while sneaking to lock it");
//         e.player.addTag("leaf:chest-lock-tip")
//     }
// })
// world.beforeEvents.playerInteractWithBlock.subscribe(e=>{
//     if(e.block.typeId != "minecraft:chest") return;
//     let doc = blockDb.findFirst({loc:vec3ToString(e.block.location)});
//     let isOwner = !doc || doc.data.owner == playerStorage.getID(e.player);
//     if(isOwner) {
//         if(e.player.isSneaking) {
//             e.cancel = true;
//             let newDoc = {
//                 loc: vec3ToString(e.block.location),
//                 owner: playerStorage.getID(e.player),
//                 locked: doc ? !doc.data.locked : true
//             };
//             if(doc) {
//                 blockDb.overwriteDataByID(doc.id, newDoc);
//             } else {
//                 blockDb.insertDocument(newDoc);
//             }
//             system.run(()=>{
//                 if(newDoc.locked) {
//                     e.player.sendMessage(`§aYou have locked this chest`);
//                 } else {
//                     e.player.sendMessage(`§cYou have unlocked this chest`);
//                 }
//             })
//         }
//     } else {
//         if(doc && !isOwner) {
//             e.cancel = true;
//             e.player.sendMessage("You are not the owner of this chest.");
//         }
//     }
// })