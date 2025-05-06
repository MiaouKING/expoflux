import { doc, updateDoc, getDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAPIs } from "/js/APIs.js";

const APIs = getAPIs();
window.APIs = APIs;

async function is_favoris() {
  var connected_user = await get_connected_user_info();
  var connected_user_uuid = connected_user.uid;
  var connected_userDoc = await get_user_from_uuid(connected_user_uuid);
  var favoris_list = connected_userDoc.favoris;

  if (favoris_list.includes(window.this_expo_uuid)) {
    return true
  } else {
    return false
  }
};
window.is_favoris = is_favoris;

async function add_favoris(expo_uuid) {
  var connected_user = await get_connected_user_info();
  var connected_user_uuid = connected_user.uid;

  const UserDocument = await doc(APIs.db, "users", connected_user_uuid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur l'utilisateur

  await updateDoc(UserDocument, { //Ajoute l'exposé à la liste des favoris
    favoris: arrayUnion(expo_uuid)
  })
};
window.add_favoris = add_favoris;

async function remove_favoris(expo_uuid) {
  var connected_user = await get_connected_user_info();
  var connected_user_uuid = connected_user.uid;
  var connected_userDoc = await get_user_from_uuid(connected_user_uuid);
  var old_favoris_list = connected_userDoc.favoris;

  var index = old_favoris_list.indexOf(expo_uuid);

  if (index > -1) {
    // Supprimer la string de la liste
    old_favoris_list.splice(index, 1);
    var updatedList = old_favoris_list //Purement "esthétique"
  } else {
    littlePopup({'icon':'error', 'text':"Cet exposé n'est pas en favoris !"});
  }

  const UserDocument = await doc(APIs.db, "users", connected_user_uuid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur l'utilisateur

  await updateDoc(UserDocument, { //Ajoute l'exposé à la liste des favoris
    favoris: updatedList
  })
};
window.remove_favoris = remove_favoris;