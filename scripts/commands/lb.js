import { world } from "@minecraft/server";
import commandManager from "../api/commands/commandManager";
import leaderboardHandler from "../leaderboardHandler";
import { prismarineDb } from "../lib/prismarinedb";

commandManager.addCommand("lb", {description: "Leaderboards"}, ({msg, args})=>{
    msg.sender.sendMessage(`!lb add <objective> - Add a leaderboard`);
})
commandManager.addSubcommand("lb", "add", {description: "Add a leaderboard"}, ({msg,args})=>{
    if(!prismarineDb.permissions.hasPermission(msg.sender, "lb.create")) return;
    if(args.length) {
        leaderboardHandler.addLeaderboard(args[0], msg.sender.location, msg.sender.dimension.id);
    }
})
commandManager.addSubcommand("lb", "remove", {description: "Remove a leaderboard"}, ({msg,args})=>{
    if(!prismarineDb.permissions.hasPermission(msg.sender, "lb.remove")) return;
    for(const doc of leaderboardHandler.db.data) {
        if(doc.data.objective == args[0]) {
            leaderboardHandler.db.deleteDocumentByID(doc.id)
            let entities = world.getDimension(doc.data.dimension ? doc.data.dimension : "overworld").getEntities({type:'leaf:floating_text',tags:[`lbid${doc.id}`]});
            if(entities && entities.length) {
                for(const entity of entities) {
                    entity.remove();
                }
            }
        }
    }
    msg.sender.success('removed leaderboards')
})