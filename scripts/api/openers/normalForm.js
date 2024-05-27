import { ActionForm } from "../../lib/form_func";
import actionParser from "../actionParser";
import icons from "../icons";

class NormalFormOpener {
    open(player, data) {
        let form = new ActionForm();
        form.title(data.name);
        if(data.body) form.body(data.body);

        for(const button of data.buttons) {
            form.button(`${button.text}${button.subtext ? `\n§r§8${button.subtext}` : ``}`, button.iconID ? icons.resolve(button.iconID) : null, (player)=>{
                actionParser.runAction(player, button.action);
            });
        }
        form.show(player, false, (player, response)=>{})
    }
}
export default new NormalFormOpener();