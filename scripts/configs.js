import { prismarineDb } from "./lib/prismarinedb";

export const sidebarConfig = prismarineDb.table("SidebarConfig").keyval();
export const generalConfig = prismarineDb.table("GeneralConfig").keyval();

if(!generalConfig.has("ChatRanks")) {
    generalConfig.set("ChatRanks", true);
}