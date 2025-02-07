import { system } from "@minecraft/server";
import icons from "../../api/icons";
import uiBuilder from "../../api/uiBuilder";
import config from "../../config"
import { ActionForm, ModalForm } from "../../lib/form_func";
import http from "../../networkingLibs/currentNetworkingLib";
import uiManager from "../../uiManager";

uiManager.addUI(config.uiNames.UIBuilderEdit, "UI Builder Edit", (player, id)=>{
    let doc = uiBuilder.db.getByID(id);
    if(!doc) return;
    let actionForm = new ActionForm();
    actionForm.title(`§f§u§l§l§s§c§r§e§e§n§rEditing "§b${doc.data.name.replace('§g§r§i§d§u§i','').replace('§c§h§e§s§t','')}§r"`);
    actionForm.button(`§6Back\n§7Go back`, icons.resolve(`leaf/image-1031`), (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderRoot);
    })
    actionForm.button(`§eEdit Buttons\n§7Move, edit, and remove buttons`, `textures/azalea_icons/ClickyClick`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderEditButtons, id);
    });
    actionForm.button(`§eEdit Form\n§7Edit form name, and more`, `textures/azalea_icons/GUIMaker/FormsV2`, (player)=>{
        uiManager.open(player, config.uiNames.UIBuilderAdd, doc.data.name, doc.data.body, doc.data.scriptevent, undefined, doc.id);
    });
    actionForm.button(``, null, (player)=>{
        let modal = new ModalForm();
        modal.title("Code Editor");
        modal.textField("Code", "Code", JSON.stringify(doc.data, null, 2));
        modal.show(player, false, ()=>{})
    })
    if(http.player) {
        let published = doc.data.accessToken ? true : false
        actionForm.button(`§d${published ? "Unpublish" : "Publish"}\n§7${published ? "Unpublish" : "Publish"} this UI ${published ? "from" : "to"} the azalea servers`, icons.resolve("leaf/image-806"), (player)=>{
            if(published) {
                uiManager.open(player, config.uiNames.UIBuilderEdit, id)
            } else {
                http.makeRequest({
                    method: 'post',
                    url: `${config.Endpoint}/post-gui`,
                    data: {
                        GuiType: "LIST",
                        PublishedByUsername: player.name,
                        GuiData: doc.data
                    }
                }, (status, data)=>{
                    system.run(()=>{
                        if(status == 200) {
                            doc.data.accessToken = data;
                            uiBuilder.db.overwriteDataByID(doc.id, doc.data)
                        }
                        uiManager.open(player, config.uiNames.UIBuilderEdit, id)
    
                    })

                })
            }
        })
    }
    actionForm.button(`§cDelete\n§7Delete this UI`, icons.resolve("leaf/image-1289"), player=>{
        uiManager.open(player, config.uiNames.Basic.Confirmation, "Are you sure you want to delete this Chest GUI?", ()=>{
            uiBuilder.db.deleteDocumentByID(id);
            return uiManager.open(player, config.uiNames.UIBuilderRoot)    
        }, ()=>{
            return uiManager.open(player, config.uiNames.UIBuilderEdit, id);
        });
    })
    actionForm.show(player, false, (player, response)=>{

    })
});