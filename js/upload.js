import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAPIs } from "/js/APIs.js";
import { getDownloadURL, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { crop_image } from "/js/cropopup.js";

const APIs = getAPIs();
window.APIs = APIs;

const max_expo_size = 30*1024*1024;
const max_expo_size_text = "30 Mo";

const max_icon_size = 5*1024*1024;
const max_icon_size_text = "5 Mo";

const blocked_filetypes = [
    "exe", "bat", "apk", "ipa", "dll",
    "vbs", "pif", "application", "msi", "bat", "com", "hta", "jar", "inf", "reg"
];

function get_filetype_from_file(file) {
    var filename = file.name
    var splitted_filename = filename.split(".")
    var filetype = splitted_filename[splitted_filename.length - 1];
    return filetype;
};
window.get_filetype_from_file = get_filetype_from_file;

function get_mimetype_from_file(file) {
    var mimetype = file.type
    var splitted_mimetype = mimetype.split("/")
    var filetype = splitted_mimetype[0];
    return filetype;
};
window.get_mimetype_from_file = get_mimetype_from_file;

async function upload_expo() {
  const this_expo_uuid = uuid.v4();
  const steps = ['1', '2', '3', '4', '5', '6'];
  const Queue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: 'Confirmer >',
    allowOutsideClick : false,
    allowEscapeKey : false,
    allowEnterKey : false,
    // optional classes to avoid backdrop blinking between steps
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' },
  });
  window.uploadqueue = {
    "name":"", //Nom de l'expo
    "desc":"", //Description de l'expo
    "subject":"", //Matière de l'expo
    "icon":"", //Icône de l'expo
    "file":"", //Fichier expo
    "date":"", //Date à laquelle l'expo a été uploadé (calculé par défaut sans intervention du user)
    "filetype":"", //Format de l'expo (calculé par défaut sans intervention du user)
    "private": false, //Est-ce que l'expo est verrouillé ou pas
    "author":"" //Auteur de l'expo (sans intervention du user)
  };
  await Queue.fire({
    title: 'Choisir un nom',
    currentProgressStep: 0,
    icon: 'question',
    input: "text",
    inputPlaceholder: "Mon exposé",
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === "") {
          resolve("Tu dois choisir un nom !");
        } else {
          window.uploadqueue.name = value;
          resolve();
        }
      });
    }
  });
  await Queue.fire({
    title: 'Entrer une description',
    currentProgressStep: 1,
    icon: 'question',
    input: "textarea",
    inputPlaceholder: "Exposé sur la première guerre mondiale. Détaillé sur ses caus...",
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === "") {
          resolve("Tu dois entrer une description !");
        } else {
          window.uploadqueue.desc = value;
          resolve();
        }
      });
    }
  });
  await Queue.fire({
    title: 'Choisir une matière',
    currentProgressStep: 2,
    icon: 'question',
    input: "select",
    inputOptions: {
        "islam": "Éthique musulmane",
        "eps": "EPS",
        "Langues": {
            "fr": "Français",
            "eng": "Anglais LVA",
            "engrenf": "Anglais renforcé",
            "engeuro": "Anglais euro",
            "ar": "Arabe LVB",
            "arrenf": "Arabe renforcé",
            "alm": "Allemand LVB",
            "esp": "Espagnol LVB",
            "lat": "Latin",
        },
        "Sciences": {
              "svt": "S.V.T.",
              "ps": "Physique-Chimie",
              "techno": "Technologie"
        },
        "Arts": {
            "ap": "Arts plastiques",
            "em": "Éducation musicale"
        },
        "Histoire-Geographie-EMC": {
            "h": "Histoire",
            "geo": "Géographie",
            "emc": "EMC"
        }
    },
    inputPlaceholder: "Aucune",
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === "") {
          resolve("Tu dois sélectionner une matière !");
        } else {
          window.uploadqueue.subject = value;
          resolve();
        }
      });
    }
  });

  await Queue.fire({
    title: "Choisir un aperçu de l'exposé (taille max: " + max_icon_size_text + ')',
    currentProgressStep: 3,
    icon: 'question',
    input: 'file',
    inputAttributes: {
      "accept": "image/*",
    },
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === null) {
          resolve("Tu dois sélectionner un aperçu pour ton exposé !");
        } else if (value.size >= max_icon_size) {
          resolve("Le fichier que tu as sélectionné dépasse la limite maximale !");
        } else if (get_mimetype_from_file(value) != "image") {
          resolve("Le fichier que tu as sélectionné n'est pas une image !");
        } else {
          window.uploadqueue.icon = value;
          resolve();
        }
      });
    }
  });

  await Queue.fire({
    title: 'Choisir un fichier (taille max: ' + max_expo_size_text + ')',
    currentProgressStep: 4,
    icon: 'question',
    input: "file",
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === null) {
          resolve("Tu dois sélectionner un fichier !");
        } else if (value.size >= max_expo_size) {
            resolve("Le fichier que tu as sélectionné dépasse la limite maximale !");
        } else if (blocked_filetypes.includes(get_filetype_from_file(value))) {
            resolve("Ce type de fichier n'est pas autorisé !");
        } else {
          window.uploadqueue.file = value;
          resolve();
        }
      });
    }
  });

  await Queue.fire({
    currentProgressStep: 5,
    title: "Souhaites-tu que l'exposé soit privé ?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: "Privé",
    cancelButtonText: "Public",
  }).then((result) => {
      if (result.isConfirmed) {
        window.uploadqueue.private = true;
      } else {
        window.uploadqueue.private = false;
      }
  });

  uploadqueue.date = Timestamp.now();
  uploadqueue.filetype = get_filetype_from_file(uploadqueue.file);
  uploadqueue.filename = uploadqueue.file.name;

  var user = await get_connected_user_info();
  var user_uuid = user.uid;
  uploadqueue.author = user_uuid;

  const userDocument = await doc(APIs.db, "users", user_uuid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur l'expo
  await updateDoc(userDocument, { //Ajoute toutes les infos de l'expo dans l'emplacement de newExpoDocument !
      expos: arrayUnion(this_expo_uuid)
  });

  await uploadExpoServerSide(uploadqueue, this_expo_uuid);
};

window.upload_expo = upload_expo;


async function uploadExpoServerSide(uploadqueue, uid) {
  var uq = uploadqueue //Pour aller plus vite :D

  const newExpoDocument = await doc(APIs.db, "expos", uid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur l'expo
  const newExpoIcon = await ref(APIs.storage, "expo-icons/" + uid); //Génère une variable avec l'emplacement de la future icône de l'expo
  const newExpoFile = await ref(APIs.storage, "expo-files/" + uid); //Génère une variable avec l'emplacement du futur fichier de l'expo

  await setDoc(newExpoDocument, {}); //Crée un doc Firebase vide à l'emplacement de newExpoDocument

  await uploadBytesResumable(newExpoIcon, uq.icon) //Upload l'icône à l'emplacement newExpoIcon
  var iconURL = await getDownloadURL(newExpoIcon) //Récupère l'URL de l'icône uploadée à l'emplacement newExpoIcon

  await uploadBytesResumable(newExpoFile, uq.file) //Upload le fichier à l'emplacement newExpoFile
  var fileURL = await getDownloadURL(newExpoFile) //Récupère l'URL du fichier uploadé à l'emplacement newExpoFile

  await updateDoc(newExpoDocument, { //Ajoute toutes les infos de l'expo dans l'emplacement de newExpoDocument !
    name: uq.name,
    desc: uq.desc,
    subject: uq.subject,
    icon: iconURL,
    file: fileURL,
    date: uq.date,
    filetype: uq.filetype,
    downloads: 0,
    private: uq.private,
    shown: true,
    author: uq.author,
    filename: uq.filename,
    views: 0
  })
  await littlePopup({text:"Upload terminé avec succès !", icon:"success"});
};
window.uploadExpoServerSide = uploadExpoServerSide;