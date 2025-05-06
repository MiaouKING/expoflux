import { getAPIs } from "/js/APIs.js"
import { onSnapshot, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"; //Firebase Cloud Firestore

const APIs = getAPIs();
const exposDir = collection(APIs.db, 'expos'); //Génère une variable avec l'emplacement du dossier Firebase contenant tous les docs des expos
window.exposDir = exposDir

async function getItems() {
    var snap = await getDocs(exposDir);
    emptyAllGroups(); //Vide complètement tous les groupes
    snap.forEach(function (doc) { //Pour chaque document, >
                if (doc.exists()) { //Si le document existe réellement?
                    const expo = doc.data(); //Génère une variable avec le contenu du doc scanné
                    if (expo.private == false) { //Si l'exposé est public
                        if (expo.views > 50) {
                            addItem(expo, doc.id, window.groups.known)
                        }

                        const now = new Date();  // Date actuelle
                        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); // Date du mois dernier à la même journée

                        const date = expo.date.toDate()
                        if (date >= oneMonthAgo && date <= now) {
                            addItem(expo, doc.id, window.groups.lastmonth)
                        }
                        var subject = eval("window.subjects." + expo.subject)
                        addItem(expo, doc.id, subject); //Demande à addItem() d'afficher l'expo en lui donnant toutes ses caractéristiques.
                    }
                }
            })

    var x = `
    onSnapshot(exposDir, function (snap) { //Réexécute le code ci-dessous à chaque fois qu'un changement est détecté dans le dossier exposDir

        snap.forEach(function (doc) { //Pour chaque document, >
            if (doc.exists()) { //Si le document existe réellement?
                const expo = doc.data(); //Génère une variable avec le contenu du doc scanné
                if (expo.private == false) { //Si l'exposé est public
                    if (expo.views > 50) {
                        addItem(expo, doc.id, window.groups.known)
                    }

                    const now = new Date();  // Date actuelle
                    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); // Date du mois dernier à la même journée

                    const date = expo.date.toDate()
                    if (date >= oneMonthAgo && date <= now) {
                        addItem(expo, doc.id, window.groups.lastmonth)
                    }
                    var subject = eval("window.subjects." + expo.subject)
                    addItem(expo, doc.id, subject); //Demande à addItem() d'afficher l'expo en lui donnant toutes ses caractéristiques.
                }
            }
        })
    });`
};

window.getItems = getItems;