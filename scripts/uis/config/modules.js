import configAPI from "../../api/config/configAPI";
import config from "../../config";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

configAPI.registerProperty("Clans", configAPI.Types.Boolean, true);
configAPI.registerProperty("LandClaims", configAPI.Types.Boolean, true);
configAPI.registerProperty("Generators", configAPI.Types.Boolean, false);
configAPI.registerProperty("Shops", configAPI.Types.Boolean, true);
configAPI.registerProperty("PlayerShops", configAPI.Types.Boolean, true);

uiManager.addUI(config.uiNames.Config.Modules, "Module Config", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Modules");
    modalForm.toggle("Clans", configAPI.getProperty("Clans"))
    modalForm.toggle("Land Claims", configAPI.getProperty("LandClaims"))
    modalForm.toggle("Generators §a(Very experimental)", configAPI.getProperty("Generators"))
    modalForm.toggle("Shops", configAPI.getProperty("Shops"))
    modalForm.toggle("PlayerShops", configAPI.getProperty("PlayerShops"))
    modalForm.show(player, false, (player, response)=>{
        if(response.canceled) return uiManager.open(player, config.uiNames.ConfigRoot);
        configAPI.setProperty("Clans", response.formValues[0]);
        configAPI.setProperty("LandClaims", response.formValues[1]);
        configAPI.setProperty("Generators", response.formValues[2]);
        configAPI.setProperty("Shops", response.formValues[3]);
        configAPI.setProperty("PlayerShops", response.formValues[4]);
        return uiManager.open(player, config.uiNames.ConfigRoot);
    })
})