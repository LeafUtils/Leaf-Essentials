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
            category
        })
    }
    deleteCommand(name) {
        let doc = this.db.findFirst({name});
        if(!doc) return;
        this.db.deleteDocumentByID(doc.id);
    }
}