import { Player, system, world } from "@minecraft/server"
import { formatStr } from "./api/azaleaFormatting"
import configAPI from "./api/config/configAPI"

export function createMessage(player, msg) {
    if(msg.includes("boom")) {
        system.run(()=>{
            player.applyKnockback(0, 0, 0, 30)
        })
    }
    world.sendMessage(
        formatStr(
            configAPI.getProperty("chatformat"),
            player,
            {
                msg: msg,
                rc: "§7"
            }
        ).replaceAll('%','%%')
    )

}