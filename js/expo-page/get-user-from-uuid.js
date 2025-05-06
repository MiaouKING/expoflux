import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAPIs } from "/js/APIs.js";

const APIs = getAPIs();
window.APIs = APIs;

export async function get_user_from_uuid(uuid) {
    const UserDocument = await doc(APIs.db, "users", uuid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur le user
    var userSnap = await getDoc(UserDocument)
    var user = userSnap.data()
    
    return user
};
window.get_user_from_uuid = get_user_from_uuid;