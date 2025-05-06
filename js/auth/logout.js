import { getAPIs } from "/js/APIs.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const APIs = getAPIs();
window.APIs = APIs;

export async function logout() {
  try {
    signOut(APIs.auth); //Se déconnecter
    await littlePopup({icon:"success", text:"Tu as été déconnecté avec succès"});
  } catch (iui) {
    await littlePopup({icon:"error",text:"Une erreur inconnue est survenue : " + iui.message})
    return
  }
};
window.logout = logout;