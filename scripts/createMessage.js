import { world } from "@minecraft/server"
import { formatStr } from "./api/azaleaFormatting"

export function createMessage(player, msg) {
        world.sendMessage(
            formatStr(
                // `{{has_tag staffchat "<bc>[<nc>StaffChat<bc>] " "<bl>"}}§r<bc>[<rc>{{rank_joiner "<drj>"}}§r<bc>] §r<nc><name> §r<bc><dra> §r<mc><msg>`,
                `{{has_tag staffchat "<bc>[<nc> StaffChat §r<bc>] " "<bl>"}}§r<bc>[ <rc>{{rank_joiner "<drj>"}}§r<bc> ] §r<nc><name> §r§l<bc><dra> §r<mc><msg>`,
                player,
                {
                    msg: msg,
                    rc: "§7"
                }
            )
        )

}