import { getAPIs } from "/expoflux/js/APIs.js";
import { createUserWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const APIs = getAPIs();
window.APIs = APIs;

async function signup(e) {
    e.preventDefault(); //Annule la requête HTTP qui aurait été effectuée par défaut par <form>

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const second_password = e.target[3].value;
    const checkbox = e.target[5].checked;

    if (second_password !== password) {
      await littlePopup({icon:"error", text:"Les deux mots de passe ne correspondent pas !"});
      return;
    }

    if (checkbox) { //Si la case Se souvenir de moi est cochée
      setPersistence(APIs.auth, browserLocalPersistence) //Faire en sorte qu'on se souvienne bel et bien de l'utilisateur
      .catch(async (error) => {
        await littlePopup({icon:"error", text:"Erreur lors de la configuration de l'authentification persistante : " + error});
        await littlePopup({icon:"error", text:"La création du compte a été annulée"});
        return
      });
    }

    try {
        //Create user
        const res = await createUserWithEmailAndPassword(APIs.auth, email, password);
        window.actuser = res.user;

        try {
            await updateProfile(res.user, { //Ajoute les infos au profil Firebase Auth
            displayName,
            photoURL: "http://averrostorage.xp3.biz/assets/def_pfp.png",
            });
            
            const newUserDocument = doc(APIs.db, "users", res.user.uid) //Génère une variable avec l'emplacement du futur doc Firebase qui contiendra les infos du user
            await setDoc(newUserDocument, { //Crée un document vide à l'emplacement de newUserDocument avec le contenu ci-dessous
            uid: res.user.uid,
            displayName: displayName,
            email: email,
            photoURL: "http://averrostorage.xp3.biz/assets/def_pfp.png",
            expos: [],
            date: Timestamp.now(),
            settings: {
                            "theme":"dark"
                      },
            favoris: [],
            reports: []
            });

            await littlePopup({text: "Ton compte a été créé avec succès !",icon: "success"});
        } catch (erro) {
            await littlePopup({text: "Il y a eu une erreur lors de la création de ton compte",icon: "error",footer:erro});
            return
        }
    } catch (erro) {
      if (erro.code === "auth/email-already-exists") {
        await littlePopup({icon:"error",text:"Cette adresse e-mail est déjà utilisée"});
      } else if (erro.code === "auth/email-already-in-use") {
        await littlePopup({icon:"error",text:"Cette adresse e-mail est déjà utilisée"});
      } else {
        await littlePopup({icon:"error",text:"Une erreur inconnue est survenue : " + erro.message});
      }
      console.log("Code d'erreur : " + erro.code);
      console.log(erro.message);
    }
};
window.signup = signup;