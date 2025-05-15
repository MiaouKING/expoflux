import { getAPIs } from "/expoflux/js/APIs.js";
import { get_connected_user_info } from "/js/auth/get-connected-user-info.js"

const APIs = getAPIs();
window.APIs = APIs;

async function get_user_expos() {
    var user = await get_connected_user_info();
    console.log(user)
    var userDoc = await get_user_from_uuid(user.uid);
    var expos_list = userDoc.expos;

    expos_list.forEach(async function (expo_uuid) { //Pour chaque expo, >
        const expo = await get_expo_from_uuid(expo_uuid)
        addItem(expo, expo_uuid, window.mes_expos); //Demande à addItem() d'afficher l'expo en lui donnant toutes ses caractéristiques.
    })
};
window.get_user_expos = get_user_expos;

async function get_favoris_expos() {
    var user = await get_connected_user_info();
    var user_uuid = user.uid;
    var userDoc = await get_user_from_uuid(user_uuid);
    var expos_list = userDoc.favoris;

    expos_list.forEach(async function (expo_uuid) { //Pour chaque expo, >
        const expo = await get_expo_from_uuid(expo_uuid)
        addItem(expo, expo_uuid, window.mes_favoris); //Demande à addItem() d'afficher l'expo en lui donnant toutes ses caractéristiques.
    })
};
window.get_favoris_expos = get_favoris_expos;