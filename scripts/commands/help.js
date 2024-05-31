import commandManager from "../api/commands/commandManager";
import playerStorage from "../api/playerStorage";

commandManager.addCommand("help", {description: "Get help with Leaf Essentials", category: "Help"}, ({msg,args})=>{
    let commands = commandManager.cmds.findDocuments(null);
    let commandData = {};
    for(const command of commands) {
        let category = command.data.category ? command.data.category : "Uncategorized";
        if(commandData[category]) commandData[category].push(command.data)
        else commandData[category] = [command.data];
    }
    let text = [];
    for(const category of Object.keys(commandData)) {
        text.push(`§8----------- §a${category} §r§8-----------`)
        for(const command of commandData[category]) {
            text.push(`§e${commandManager.prefix}${command.name} §r§7${command.description ? command.description : "No Description"}`)
            let subcommands = commandManager.getSubCommandsFromCommand(command.name);
            if(subcommands.length) {
                for(const subcommand of subcommands) {
                    text.push(`§f- §b${commandManager.prefix}${command.name} ${subcommand.name} §r§7${subcommand.description ? subcommand.description : "No Description"}`)
                }
            }
        }
    }
    msg.sender.sendMessage(text.join('\n§r'))
})

commandManager.addSubcommand("help", "setup", {description: "Get help setting up Leaf Essentials"}, ({msg})=>{
    msg.sender.sendMessage("WIP")
})
commandManager.addSubcommand("help", "my-id", {description: "Get your player ID"}, ({msg})=>{
    msg.sender.sendMessage(playerStorage.getID(msg.sender))
})