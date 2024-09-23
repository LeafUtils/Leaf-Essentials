import configAPI from "../../api/config/configAPI";
import emojis from "../../api/emojis";
import config from "../../config";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

configAPI.registerProperty("Clans", configAPI.Types.Boolean, true);
configAPI.registerProperty("LandClaims", configAPI.Types.Boolean, true);
configAPI.registerProperty("Generators", configAPI.Types.Boolean, false);
configAPI.registerProperty("Shops", configAPI.Types.Boolean, true);
configAPI.registerProperty("PlayerShops", configAPI.Types.Boolean, true);
configAPI.registerProperty("ExtendedUIBuilder", configAPI.Types.Boolean, false);
configAPI.registerProperty("ExperimentalChatRankFormatting", configAPI.Types.Boolean, false);
configAPI.registerProperty("Chatranks", configAPI.Types.Boolean, true);
configAPI.registerProperty("DevMode", configAPI.Types.Boolean, false);
uiManager.addUI(config.uiNames.Config.Modules, "Module Config", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Modules");
    modalForm.toggle("Clans", configAPI.getProperty("Clans"))
    modalForm.toggle("Land Claims", configAPI.getProperty("LandClaims"))
    modalForm.toggle(`§aGenerators ${emojis.potion48}`, configAPI.getProperty("Generators"))
    modalForm.toggle("Shops", configAPI.getProperty("Shops"))
    modalForm.toggle("PlayerShops", configAPI.getProperty("PlayerShops"))
    modalForm.toggle(`§aExtended UI Builder ${emojis.potion48}`, configAPI.getProperty("ExtendedUIBuilder"))
    modalForm.toggle(`§aExperimental Chat Rank Formatting ${emojis.potion48}`, configAPI.getProperty("ExperimentalChatRankFormatting"))
    modalForm.toggle(`Chat Ranks`, configAPI.getProperty("Chatranks"))
    modalForm.toggle(`§bDeveloper Mode ${emojis.potion49}`, configAPI.getProperty("DevMode"))
    modalForm.show(player, false, (player, response)=>{
        if(response.canceled) return uiManager.open(player, config.uiNames.ConfigRoot);
        configAPI.setProperty("Clans", response.formValues[0]);
        configAPI.setProperty("LandClaims", response.formValues[1]);
        configAPI.setProperty("Generators", response.formValues[2]);
        configAPI.setProperty("Shops", response.formValues[3]);
        configAPI.setProperty("PlayerShops", response.formValues[4]);
        configAPI.setProperty("ExtendedUIBuilder", response.formValues[5]);
        configAPI.setProperty("ExperimentalChatRankFormatting", response.formValues[6]);
        configAPI.setProperty("Chatranks", response.formValues[7]);
        configAPI.setProperty("DevMode", response.formValues[8]);
        
        return uiManager.open(player, config.uiNames.ConfigRoot);
    })
})