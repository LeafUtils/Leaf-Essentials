import { world } from "@minecraft/server";
import emojis from "../../api/emojis";
import config from "../../config";
import { ModalForm, prismarineDb } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.CurrencyEditorAdd, "Add a currency", (player)=>{
    // prismarineDb.economy.addCurrency(scoreboard, symbol, displayName);
    let form = new ModalForm();
    form.textField("scoreboard", "Scoreboard Objective", "adsdagdsgf");
    let emojis1 = [];
    let emojis2 = [];
    for(const emoji in emojis) {
        emojis1.push(`${emojis[emoji]} :${emoji}:`)
        emojis2.push(emojis[emoji])
    }
    form.dropdown("symbol", "Symbol", emojis1)
    form.textField("display-name", "Display Name", "adfgds");
    form.show(player, function(player) {
        world.sendMessage(emojis2[this.get("symbol")])
    })
})