import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"; //Firebase Initializer
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js"; //Firebase Analytics
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"; //Firebase Auth
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"; // Firebase Storage
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"; //Firebase Cloud Firestore
/*import { admin } from "https://cdn.jsdelivr.net/npm/firebase-admin@12.4.0/lib/index.min.js"; //Firebase Admin SDK*/
import "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.js"; //CropperJS


export function addLib(src) {
  const lii = document.createElement("link");
  lii.src = src;
  document.head.appendChild(lii);
}
addLib("https://sdk.tenor.com/js/v1/tenor-sdk.min.js"); //Tenor 
addLib("https://cdn.jsdelivr.net/npm/js-cookie@3.0.0/dist/js.cookie.min.js"); //JsCookie
addLib("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"); //SweetAlert
addLib("https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"); //FileSaver

export const APIkeys = {
  "firebase":"AIzaSyADFI6U-tDpo0a_deDPqTzn8tMvmT0Qq0Q",
  "firebase-admin-key":"fak.json",
  "tenor":"LIVDSRZULELA",
  "filepreviews_user":"SQdpA7i5sNJUIf2FM39jTlDg87AN4D",
  "filepreviews_pw":"kzkoMlqQiITZq8qayqaEdvtMLOHQDv"
};

export async function getCDN(link) {
  const response = await fetch(
    link,
  )
  return response.json()
}

// Initialize Firebase
export function getAPIs() {
  const app = initializeApp({
    apiKey: APIkeys["firebase"],
    authDomain: "averrostorage.firebaseapp.com",
    projectId: "averrostorage",
    storageBucket: "averrostorage.appspot.com",
    messagingSenderId: "94195602147",
    appId: "1:94195602147:web:a7beef1761223ccc29abd6",
    measurementId: "G-XSTJWKQVL1"
  });
  /*const admin_app = admin.initializeApp({
    credential: admin.credential.cert(APIkeys["firebase-admin-key"])
  });*/

  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const cropper = Cropper;
  return {app, analytics, auth, storage, db, cropper};
};

export async function searchTenor(query, limit) {
  var data = await getCDN(`https://api.tenor.com/v1/search?q=${query}&key=${APIkeys["tenor"]}&limit=${limit}`);
  return data.results;
};

export async function createPreview(file_url) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        window.started_processing_response = request.responseText;
        console.log(window.started_processing_response)
        var preview_id = window.started_processing_response.id;
        console.log(preview_id)
    }
  }
  await request.open("POST", "https://api.filepreviews.io/v2/previews/", true, APIkeys["filepreviews_user"], APIkeys["filepreviews_pw"]);
  await request.setRequestHeader("Content-Type", "application/json");
  await request.send('{"url":"' + file_url + '"}');



  while (window.processing_response.status !== "success" & window.STOP_IT_ALL == false) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          window.processing_response = request.responseText;
        }
      }
      request.open("GET", "https://api.filepreviews.io/v2/previews/" + preview_id + "/", true, APIkeys["filepreviews_user"], APIkeys["filepreviews_pw"]);
      await request.send(null);

      console.log(window.processing_response)
  }
  return window.processing_response.preview.url
};
window.cp = createPreview;