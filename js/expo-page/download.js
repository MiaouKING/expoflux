import { doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAPIs } from "/expoflux/js/APIs.js";

const APIs = getAPIs();
window.APIs = APIs;

async function download(filelink, filename, uuid) {
  const ExpoDocument = await doc(APIs.db, "expos", uuid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur l'expo téléchargé

  var docSnap = await getDoc(ExpoDocument)
  var expoData = docSnap.data()
  var currentDownloads = expoData.downloads; //Récupère le nombre de téléchargements de l'expo !

  await updateDoc(ExpoDocument, { //Icrémente de 1 le nombre de téléchargements du document Firebase situé à ExpoDocument !
    downloads: currentDownloads + 1
  })

  console.log("Started downloading...")
  console.log(filelink)
  console.log(filename)
  saveAs(filelink, filename); //Télécharge le fichier avec le nom correct
  console.log("Downloading (should) be done :D")
};
window.download = download;