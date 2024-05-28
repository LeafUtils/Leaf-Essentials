import commandManager from "../api/commands/commandManager";
import config from "../config";
import uiManager from "../uiManager";

commandManager.addCommand("uis", "View UIs in Leaf Essentials", ({msg})=>{
    let text = [];
    text.push(`§8----------- §aList §r§8-----------`)
    for(const ui of uiManager.uis) {
        text.push(`§e${ui.id} §r§7${ui.description ? ui.description : "No Description"}`);
    }
    text.push(``);
    text.push(`§2You can open a UI by doing §f/scriptevent ${config.scripteventNames.openDefault} §e<UI ID>`);
    msg.sender.sendMessage(text.join('\n§r'))
})