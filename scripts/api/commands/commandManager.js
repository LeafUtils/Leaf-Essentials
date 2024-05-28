import { prismarineDb } from "../../lib/prismarinedb";
import translation from "../translation";
import { parseCommand } from "./parseCommand";

class CommandManager {
    constructor() {
        this.prefix = "!";
        this.cmds = prismarineDb.nonPersistentTable("Commands")
        this.subcmds = prismarineDb.nonPersistentTable("SubCommands")
    }
    addCommand(name, data, callback) {
        let cmd = this.cmds.findFirst({name});
        if(cmd) {
            this.cmds.deleteDocumentByID(cmd.id);
        }
        this.cmds.insertDocument({
            name,
            ...data,
            callback
        })
    }
    addSubcommand(parent, name, data, callback) {
        this.subcmds.insertDocument({
            parent,
            name,
            ...data,
            callback
        });
    }
    getSubCommandsFromCommand(name) {
        return this.subcmds.findDocuments({parent:name}).map(_=>_.data);
    }
    run(msg) {
        if(!msg.message.startsWith(this.prefix)) return;
        let data = parseCommand(msg.message, this.prefix);
        let cmdName = data[0];
        let args = data.slice(1);
        let cmd = this.cmds.findFirst({name: cmdName});
        if(!cmd) return msg.sender.sendMessage(translation.getTranslation(msg.sender, "error", translation.getTranslation(msg.sender, "commands.errors.notfound")));
        if(data.length > 1) {
            let subcmd = this.subcmds.findFirst({name: data[1], parent: data[0]})
            if(subcmd) {
                return subcmd.data.callback({msg, args});
            }
        }
        return cmd.data.callback({msg, args});
    }
}

export default new CommandManager();