import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAPIs } from "/js/APIs.js";

const APIs = getAPIs();
window.APIs = APIs;

async function report(expo_uuid) {
    const steps = ['1', '2', '3', '4'];
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
        "reason":"", //Raison du signalement
        "desc":"", //Description du problème
        "title":"",
        "notifyme": false, //Est-ce que l'utilisateur qui a signalé l'expo devrait être notifié si une action est prise contre l'expo ?
        "author":"", //Auteur du signalement (sans intervention du user)
        "expo_uuid":expo_uuid
    };
    await Queue.fire({
        title: 'Choisir un titre',
        currentProgressStep: 0,
        icon: 'question',
        input: "text",
        inputPlaceholder: "L'exposé contient du contenu déplacé",
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === "") {
              resolve("Tu dois choisir un titre !");
            } else {
              window.uploadqueue.title = value;
              resolve();
            }
          });
        }
    });
    await Queue.fire({
        title: 'Pourquoi souhaites-tu signaler cet exposé ?',
        currentProgressStep: 1,
        icon: 'question',
        input: "select",
        inputOptions: {
            "sex": "Contenu à caractère pornographique",
            "self-kill": "Suicide/Incitation au suicide",
            "ui": "Usurpation d'identité",
            "virus": "Logiciel(s) malveillant(s) embarqué(s) (dont des virus ou scripts)",
            "links": "Lien(s) malveillant(s)",
            "not-legal": "Propagande/Promotion de contenu illégal",
            "name/desc": "Nom ou description inappropriés",
            "pub": "Publicité",
            "void": "L'exposé est vide",
            "tm": "Non respect des droits d'auteur",
            "vol": "Vol d'un autre exposé",
            "iac": "Incitation au crime",
            "ctr": "Contenu terroriste/raciste excessif",
            "other": "Autre"
        },
        inputPlaceholder: "...",
        inputValidator: (value) => {
        return new Promise((resolve) => {
            if (value === "") {
            resolve("Tu dois sélectionner une raison !");
            } else {
            window.uploadqueue.reason = value;
            resolve();
            }
        });
        }
    });
    await Queue.fire({
        title: 'Ecris une courte description du problème.',
        currentProgressStep: 2,
        icon: 'question',
        input: "textarea",
        inputPlaceholder: "Cet exposé contient un virus, et sa description contient un lien vraiment étran...",
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
        title: "Souhaites-tu être notifié si une action est prise contre cet exposé ?",
        currentProgressStep: 3,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
          if (result.isConfirmed) {
            window.uploadqueue.notifyme = true;
          } else {
            window.uploadqueue.notifyme = false;
          }
    });

    var user = await get_connected_user_info();
    var user_uuid = user.uid;
    uploadqueue.author = user_uuid;

    await reportServerSide(window.uploadqueue);
};
window.report = report;

async function reportServerSide(uploadqueue) {
    var uq = uploadqueue //Pour aller plus vite :D
    const uid = uuid.v4() //Crée l'uuid unique du singalement
  
    const newExpoDocument = await doc(APIs.db, "reports", uid); //Génère une variable avec l'emplacement du doc Firebase contenant les infos sur l'expo
  
    await setDoc(newExpoDocument, {}); //Crée un doc Firebase vide à l'emplacement de newExpoDocument
  
    await updateDoc(newExpoDocument, { //Ajoute toutes les infos de l'expo dans l'emplacement de newExpoDocument !
        reason: uq.reason,
        desc: uq.desc,
        notifyme: uq.notifyme,
        author: uq.author,
        expo_uuid: uq.expo_uuid,
        title: uq.title,
        date: Timestamp.now()
    })
    await littlePopup({text:"Ton signalement a bien été pris en compte.", icon:"success"});
  };
  window.reportServerSide = reportServerSide;