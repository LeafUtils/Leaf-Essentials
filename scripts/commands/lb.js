import commandManager from "../api/commands/commandManager";

commandManager.addCommand("lb", {description: "Leaderboards"}, ({msg, args})=>{
    msg.sender.sendMessage(`!lb add <objective> - Add a leaderboard`);
})
commandManager.addSubcommand("lb", "add", {description: "Add a leaderboard"}, ({msg,args})=>{
    msg.sender.sendMessage("Sorry, this command is currently unfinished");
})