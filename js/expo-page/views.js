import { doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAPIs } from "/js/APIs.js";

const APIs = getAPIs();
window.APIs = APIs;

async function add_view(uuid) {
  const ExpoDocument = await doc(APIs.db, "expos", uuid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur l'expo téléchargé

  var docSnap = await getDoc(ExpoDocument)
  var expoData = docSnap.data()
  var currentViews = expoData.views; //Récupère le nombre de vues de l'expo !

  await updateDoc(ExpoDocument, { //Icrémente de 1 le nombre de vues du document Firebase situé à ExpoDocument !
    views: currentViews + 1
  })
};
window.add_view = add_view;