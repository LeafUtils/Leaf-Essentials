// PrismarineDB Version: 2.0
import { world } from '@minecraft/server';
function MergeRecursive(obj1, obj2) {
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor==Object ) {
          obj1[p] = MergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }
    return obj1;
}
let nonPersistentData = {};
class PrismarineDBTable {
    #storage;
    constructor(tableName = "default", storage) {
        this.#storage = storage;
        this.table = tableName;
        this.data = [];
        this.trash = [];
        this.folders = [];
        this.load();
        this.loadTrash();
        this.loadFolders();
    }
    loadFolders() {
        this.folders = this.#storage.load(`${this.table}~folders`);
    }
    saveFolders() {
        this.#storage.save(`${this.table}~folders`, this.folders);
    }
    loadTrash() {
        this.trash = this.#storage.load(`${this.table}~trash`);
    }
    saveTrash() {
        this.#storage.save(`${this.table}~trash`, this.trash);
    }
    load() {
        this.data = this.#storage.load(this.table);
    }
    save() {
        this.#storage.save(this.table, this.data);
    }

    clear() {
        this.data = [];
        this.save();
    }

    #genID() {
        return Date.now();
    }

    get rawData() {
        return this.data
    }
    createFolder(name) {
        if(this.folders.find(_=>_.name == name)) return;
        this.folders.push({
            name,
            documentIDs: []
        });
        this.saveFolders();
    }
    getFolderDocuments(name) {
        this.loadFolders();
        let folder = this.folders.find(_=>_.name == name);
        if(!folder) return;
        let docs = [];
        for(const document of folder.documentIDs) {
            let doc = this.getByID(document);
            if(!doc) {
                folder.documentIDs = folder.documentIDs.filter(_=>_ != document);
                this.saveFolders();
            }
            docs.push(doc);
        }
        return docs;
    }
    addDocumentToFolder(name, id) {
        this.loadFolders();
        let folder = this.folders.findIndex(_=>_.name == name);
        if(folder < 0) return;
        if(this.folders[folder].documentIDs.includes(id) || !this.getByID(id)) return;
        this.folders[folder].documentIDs.push(id);
        this.saveFolders();
    }
    getFolders() {
        return this.folders.map(_=>_.name);
    }
    deleteFolder(name) {
        this.folders = this.folders.filter(_=>_.name != name);
        this.saveFolders();
    }
    insertDocument(data) {
        let id = this.#genID();
        this.data.push({
            id,
            data,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        this.save();
        return id;
    }

    overwriteDataByID(id, data) {
        let docIndex = this.data.findIndex(document=> document.id == id);
        if(docIndex < 0) return null;
        this.data[docIndex].data = data;
        this.data[docIndex].updatedAt = Date.now();
        this.save();
        return data;
    }
    matchesQuery(query, data) {
        if(typeof query === "string" && typeof data === "string") return query == data;
        if(typeof query === "object" && typeof data === "string") {
            if(query.lengthGreaterThan) return data.length > query.lengthGreaterThan
            if(query.lengthLessThan) return data.length > query.lengthLessThan
            return false;
        }
        if(typeof query === "object" && typeof data === "object") {
            if(data.type && data.type == "Date") {
                if(query.after) return new Date(data.timestamp).getTime() > query.after
                if(query.before) return new Date(data.timestamp).getTime() < query.before
                return false;
            } else {
                let unsuccessfulRuns = 0;
                function matchQueryRecursive(query) {
                    for(const key in query) {
                        if(typeof query[key] !== "object") {
                            if(!data[key] || data[key] != query[key]) unsuccessfulRuns++
                        } else if(typeof query[key] === "object") {
                            matchQueryRecursive(query[key]);
                        }
                    }    
                }
                matchQueryRecursive(query);
                return unsuccessfulRuns == 0;
            }
        }
    }
    findDocuments(query) {
        let docs = [];
        for(const doc of this.data) {
            if(query == null) {
                docs.push(doc);
                continue;
            }
            if(this.matchesQuery(query, doc.data)) docs.push(doc);
        }
        return docs;
    }
    findFirst(query) {
        let docs = this.findDocuments(query);
        if(docs.length) return docs[0];
        return null;
    }
    updateFirstDocumentByQuery(query, data) {
        let doc = this.findFirst(query);
        if(!doc) return false;
        if(typeof data === "object")
            return this.overwriteDataByID(doc.id, MergeRecursive(doc.data, data));
        else
            return this.overwriteDataByID(doc.id, data);
    }
    overwriteFirstDocumentByQuery(query, data) {
        let doc = this.findFirst(query);
        if(!doc) return false;
        return this.overwriteDataByID(doc.id, data);
    }
    deleteDocumentByID(id) {
        let docIndex = this.data.findIndex(document=> document.id == id);
        if(docIndex < 0) return false;
        this.data.splice(docIndex, 1);
        this.save();
        return true;
    }
    deleteFirstDocumentByQuery(query) {
        let doc = this.findFirst(query);
        if(!doc) return false;
        return this.deleteDocumentByID(doc.id);
    }

    getByID(id) {
        let docIndex = this.data.findIndex(document=> document.id == id);
        if(docIndex < 0) return null;
        return this.data[docIndex];
    }

    createKeyValDocument(id) {
        if(this.findFirst({__keyval_id: id})) return;
        return this.insertDocument({
            type: "__keyval__",
            __keyval_data: {},
            __keyval_id: id
        });
    }

    keyval(id) {
        let doc = this.findFirst({__keyval_id: id});
        let docID = null;
        if(!doc) {
            docID = this.createKeyValDocument(id);
        } else {
            docID = doc.id;
        }
        return this.#keyval(docID);
    }
    trashDocumentByID(id) {
        this.loadTrash();
        this.load();
        let data = this.getByID(id);
        if(data) {
            let newData = JSON.parse(JSON.stringify(data));
            newData.expirationDate = Date.now() + (1000 * 60 * 60 * 24 * 30);
            this.trash.push(newData);
            this.deleteDocumentByID(id);
            this.save();
            this.saveTrash();
        }
    }
    getTrashedDocumentByID(id) {
        this.loadTrash();
        this.load();
        let docIndex = this.trash.findIndex(document=> document.id == id);
        if(docIndex < 0) return null;
        return this.trash[docIndex];
    }
    getTrashedDocuments() {
        for(const trash of this.trash) {
            if(Date.now() >= trash.expirationDate) this.deleteTrashedDocumentByID(trash.id);
        }
        return this.trash;
    }
    deleteTrashedDocumentByID(id) {
        let docIndex = this.trash.findIndex(document=> document.id == id);
        if(docIndex < 0) return false;
        this.trash.splice(docIndex, 1);
        this.saveTrash();
        this.save();
        return true;
    }
    untrashDocumentByID(id) {
        let data = this.getTrashedDocumentByID(id);
        if(data) {
            this.data.push(data);
            this.deleteTrashedDocumentByID(id);
            this.save();
            this.saveTrash();
        }
    }
    #keyval(id) {
        const get = (key, defaultValue = null)=> {
            this.load();
            let doc = this.getByID(id);
            let val = doc.data.__keyval_data[key] ? doc.data.__keyval_data[key].data : null;
            if(defaultValue != null && !val) return defaultValue;
            return val;
        }
        const set = (key, val)=> {
            this.load();
            let doc = this.getByID(id);
            let currentValue = doc.data.__keyval_data[key] ? doc.data.__keyval_data[key].data : null;
            let newValue = {};
            if(currentValue && currentValue.createdAt) {
                newValue.createdAt = currentValue.createdAt;
            } else {
                newValue.createdAt = Date.now();
            }
            newValue.updatedAt = Date.now();
            newValue.data = val;
            doc.data.__keyval_data[key] = newValue;
            this.overwriteDataByID(doc.id, doc.data);
        }
        const del = (key)=> {
            this.load();
            let doc = this.getByID(id);
            if(doc.data.__keyval_data[key]) delete doc.data.__keyval_data[key];
        }
        const has = (key)=> {
            this.load();
            let doc = this.getByID(id);
            if(doc.data.__keyval_data[key]) {
                return true;
            } else {
                return false;
            }
        }
        const keys = (key)=>{
            this.load();
            return Object.keys(doc.data.__keyval_data)
        }
        return {get, set, delete: del, has, keys};
    }
}
class NonPersistentStorage {
    load(table) {
        return nonPersistentData[table] ? nonPersistentData[table] : [];
    }
    save(table, data) {
        nonPersistentData[table] = data;
    }
}
class WorldPersistentStorage {
    load(table) {
        let val = ``
        try {
            val = world.getDynamicProperty(`prismarine:${table}`)
        } catch { val = `` }
        if(!val) val = `[]`;
        let data = [];
        try {
            data = JSON.parse(val);
        } catch {
            data = [];
        }
        return data
    }
    save(table, data) {
        world.setDynamicProperty(`prismarine:${table}`, JSON.stringify(data));
    }
}
class EntityPersistentStorage {
    #entity;
    constructor(entity) {
        this.#entity = entity;
    }
    load(table) {
        let val = ``
        try {
            val = this.#entity.getDynamicProperty(`prismarine:${table}`)
        } catch { val = `` }
        if(!val) val = `[]`;
        let data = [];
        try {
            data = JSON.parse(val);
        } catch {
            data = [];
        }
        return data
    }
    save(table, data) {
        this.#entity.setDynamicProperty(`prismarine:${table}`, JSON.stringify(data));
    }
}
class PrismarineDB {
    table(name) {
        return new PrismarineDBTable(name, new WorldPersistentStorage());
    }
    entityTable(name, entity) {
        return new PrismarineDBTable(name, new EntityPersistentStorage(entity));
    }
    nonPersistentTable(name) {
        return new PrismarineDBTable(name, new NonPersistentStorage());
    }
    customStorage(name, Storage, ...params) {
        return new PrismarineDBTable(name, new Storage(...params));
    }
    #getStorage(storage) {
        if(typeof storage === "string") {
            switch(storage) {
                case "entity":
                    return EntityPersistentStorage;
                case "world":
                    return WorldPersistentStorage;
            }
        }
        return storage;
    }
    convertBetweenStorageTypes(table, config1, config2) {
        let db1 = new PrismarineDBTable(table, new this.#getStorage(config1.storage, ...(config1.params ? config1.params : [])));
        db1.load();
        let db2 = new PrismarineDBTable(table, new this.#getStorage(config2.storage, ...(config2.params ? config2.params : [])));
        db2.data = db1.data;
        db2.save();
    }
}

export const prismarineDb = new PrismarineDB();