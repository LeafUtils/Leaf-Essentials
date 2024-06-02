import { prismarineDb } from '../lib/prismarinedb';
import { array_move } from './utils/array_move';
import { formatStr } from './azaleaFormatting';
const generateUUID = () => {
    let
      d = new Date().getTime(),
      d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};
class SidebarEditor {
    constructor() {
        this.db = prismarineDb.table("sidebars");
    }
    createSidebar(name) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        })
        if(doc) return;
        this.db.insertDocument({
            _type: "SIDEBAR",
            _name: name,
            lines: []
        });
    }
    deleteSidebar(name) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        });
        if(!doc) return;
        this.db.deleteDocumentByID(doc.id);
    }
    getLines(name) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        });
        if(!doc) return;
        return doc.data.lines;
    }
    getLineByID(name, id) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        });
        if(!doc) return;
        return doc.data.lines.find(_=>_.id == id);
    }
    parseEntireSidebar(player, name) {
        let lines = this.getLines(name);
        if(!lines) return "";
        return formatStr(lines, player);
    }
    duplicateSidebar(name, newName) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        });
        if(!doc) return;
        let doc2 = this.db.findFirst({
            _type: "SIDEBAR",
            _name: newName
        })
        if(doc2) return;
        this.db.insertDocument({
            ...doc.data,
            _name: newName
        })
    }
    getSidebarNames() {
        return this.db.findDocuments({_type:"SIDEBAR"}).map(_=>_._name);
    }
    addLine(name, text) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        })
        if(!doc) return;
        doc.data.lines.push({
            id: generateUUID(),
            text
        });
        this.db.overwriteDataByID(doc.id, doc.data);
    }
    removeLine(name, id) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        })
        if(!doc) return;
        doc.data.lines = doc.data.lines.filter(_=>_.id != id);
        this.db.overwriteDataByID(doc.id, doc.data);
    }
    moveLineUp(name, id) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        })
        if(!doc) return;
        let index = doc.data.lines.findIndex(_=>_.id != id);
        if(index < 1) return;
        array_move(doc.data.lines, index, index - 1);
        this.db.overwriteDataByID(doc.id, doc.data);
    }
    moveLineDown(name, id) {
        let doc = this.db.findFirst({
            _type: "SIDEBAR",
            _name: name
        })
        if(!doc) return;
        let index = doc.data.lines.findIndex(_=>_.id != id);
        if(index + 1 >= doc.data.lines.length) return;
        array_move(doc.data.lines, index, index + 1);
        this.db.overwriteDataByID(doc.id, doc.data);
    }
}

export default new SidebarEditor();