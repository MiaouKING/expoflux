import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { get_connected_user_info } from "/js/auth/get-connected-user-info.js";
import { getAPIs } from "/expoflux/js/APIs.js";

const APIs = getAPIs();
window.APIs = APIs;

export async function apply_settings() {
    var actual_user = await get_connected_user_info();
    var actual_user_uuid = actual_user.uid
    var userDoc = doc(APIs.db, "users", actual_user_uuid)

    var theme = document.getElementById("theme-select").value

    settings = {
                    "theme": theme
                }

    await updateDoc(userDoc, { //Ajoute tous les settings dans l'emplacement de userDoc !
        settings: settings
      })
      await littlePopup({text:"Tes paramètres ont été mis à jour avec succès !", icon:"success"});

}
window.apply_settings = apply_settings;