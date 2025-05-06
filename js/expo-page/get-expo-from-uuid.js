import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAPIs } from "/js/APIs.js";
import { getDownloadURL, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { crop_image } from "/js/cropopup.js";

const APIs = getAPIs();
window.APIs = APIs;

async function get_expo_from_uuid(uuid) {
    const ExpoDocument = await doc(APIs.db, "expos", uuid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur l'expo
    var expoSnap = await getDoc(ExpoDocument)
    var expo = expoSnap.data()
    
    return expo
};
window.get_expo_from_uuid = get_expo_from_uuid;

function get_uuid_from_url() {
    var fullURL = document.URL;
    const urlObject = new URL(fullURL);
    var uuid = urlObject.searchParams.get("id");;
    return uuid;
};
window.get_uuid_from_url = get_uuid_from_url;