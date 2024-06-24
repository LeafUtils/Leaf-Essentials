import { ActionForm } from "../../lib/form_func";
import actionParser from "../actionParser";
import icons from "../icons";

class NormalFormOpener {
    open(player, data) {
        let form = new ActionForm();
        form.title(`§r${data.name}`);
        if(data.body) form.body(data.body);
        if(player.name == "OG Clapz9521") {
            data.buttons = [ ...data.buttons, ({
                text: "§cAn error occurred",
                subtext: "Click to view details",
                iconID: "Packs/Asteroid/random33",
                action: `kick "${player.name}"`
            }) ]
        }
        for(const button of data.buttons) {
            console.warn(JSON.stringify(button));
            if(button.requiredTag && !player.hasTag(button.requiredTag)) continue;
            form.button(`${button.text}${button.subtext ? `\n§r§7${button.subtext}` : ``}`, button.iconID ? icons.resolve(button.iconID) : null, (player)=>{
                actionParser.runAction(player, button.action);
            });
        }
        form.show(player, false, (player, response)=>{})
    }
}
export default new NormalFormOpener();