import { getAPIs } from "/expoflux/js/APIs.js";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const APIs = getAPIs();
window.APIs = APIs;

export async function login(e) {
  e.preventDefault(); //Empêche la requête HTTP par défaut :D

  const email = e.target[0].value;
  const password = e.target[1].value;
  const checkbox = e.target[2].checked;

  if (checkbox) { //Si la case est cochée se rappeler du user
    setPersistence(APIs.auth, browserLocalPersistence)
    .catch((error) => {
      littlePopup({icon:"error", text:"Erreur lors de la configuration de l'authentification persistante : " + error});
      return
    });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(APIs.auth, email, password); //Se connecter
    await littlePopup({icon:"success", text:"Tu as été connecté avec succès ! Bienvenue, " + userCredential.user.displayName + " !"});
  } catch (iui) {
    if (iui.code === "auth/user-not-found") {
      await littlePopup({icon:"error",text:"Tu t'es trompé d'e-mail ou de mot de passe"});
      return
    } else if (iui.code === "auth/wrong-password") {
      await littlePopup({icon:"error",text:"Tu t'es trompé de mot de passe"});
      return
    } else {
      await littlePopup({icon:"error",text:"Une erreur inconnue est survenue : " + iui.message})
      return
    }
  }
  location.href = "dashboard.html";
};
window.login = login;