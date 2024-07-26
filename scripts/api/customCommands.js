import { prismarineDb } from "../lib/prismarinedb";

class CustomCommands {
    constructor() {
        this.db = prismarineDb.table("CustomCommands")
    }
    createCommand(name, description, category) {
        if(this.db.findFirst({name})) return;
        return this.db.insertDocument({
            name,
            description,
            category,
            actions: [],
            subcommands: []
        })
    }
    deleteCommand(name) {
        let doc = this.db.findFirst({name});
        if(!doc) return;
        this.db.deleteDocumentByID(doc.id);
    }
    createSubcommand(mainCommand, name, description) {
        let cmd = this.db.findFirst({name:mainCommand})
        if(!cmd) return;
        if(cmd.data.subcommands.find(_=>_.name == name)) return;
        cmd.data.subcommands.push({description,name})
        this.db.overwriteDataByID(cmd.id, cmd.data);
    }
    addRunCommandAction(name, command) {
        let doc = this.db.findFirst({name});
        if(!doc) return;
        doc.data.actions.push({type:"COMMAND",command});
        this.db.overwriteDataByID(doc.id, doc.data);        
    }
}

export default new CustomCommands();