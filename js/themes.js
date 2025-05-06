import { getAPIs } from "/js/APIs.js";
import { get_connected_user_info } from "/js/auth/get-connected-user-info.js";
import { get_user_from_uuid } from "/js/expo-page/get-user-from-uuid.js";
import { is_connected } from "/js/auth/is_connected.js";

const APIs = await getAPIs();
window.APIs = APIs;

window.themes = {
    "light":
            {
                "--expopage-body-bg":"black",
                "--expopage-bgcolor":"white",
                "--expopage-color":"black",
                "--expopage-color-h2":"black",
                "--expopage-color-h3":"black",
                "--expopage-color-p":"black",
                "--expopage-actualcontent-color":"#b3b3b3",
                "--expopage-color-small":"#b3b3b3",
                "--expopage-color-small-a":"#0071eb",
                "--expopage-form-input-accent":"#b3b3b3",

                "--expopage-previewclose-color":"#878787",
                "--expopage-previewclose-bg":"#f2f3fb",
                "--expopage-previewclose-bghover":"#ebedf9",

                "--expopage-download-button-bg":"#188916",
                "--expopage-download-button-color":"#fff",
                "--expopage-download-button-hoverbg":"#188916b6",

                "--expopage-present-button-bg":"#e95922",
                "--expopage-present-button-color":"#fff",
                "--expopage-present-button-hoverbg":"#e95a22b4",
                "--expopage-present-button-disabledbg":"#e95a2256",

                "--expopage-heart-button-bg":"#e166cc",
                "--expopage-heart-button-color":"#fff",
                "--expopage-heart-button-hoverbg":"#e166ccb0",
                "--expopage-heart-button-disabledbg":"#e166cc56",

                "--expopage-viewcounter-bg":"#065ed1",
                "--expopage-viewcounter-color":"#fff",

                "--expopage-share-button-bg":"#31beff",
                "--expopage-share-button-color":"#fff",
                "--expopage-share-button-hoverbg":"#31beff9c",

                "--expopage-report-button-bg":"#ff3131",
                "--expopage-report-button-color":"#fff",
                "--expopage-report-button-hoverbg":"#ff313180",

                "--expopage-categ-bg":"#838082",
                "--expopage-categ-color":"#fff",
                "--expopage-categ-hoverbg":"#838082a9"
            },
    "dark":
            {
                "--expopage-body-bg":"black",
                "--expopage-bgcolor":"black",
                "--expopage-color":"white",
                "--expopage-color-h2":"white",
                "--expopage-color-h3":"white",
                "--expopage-color-p":"white",
                "--expopage-actualcontent-color":"#b3b3b3",
                "--expopage-color-small":"#b3b3b3",
                "--expopage-color-small-a":"#0071eb",
                "--expopage-form-input-accent":"#b3b3b3",

                "--expopage-previewclose-color":"#878787",
                "--expopage-previewclose-bg":"#f2f3fb",
                "--expopage-previewclose-bghover":"#ebedf9",

                "--expopage-download-button-bg":"#188916",
                "--expopage-download-button-color":"#fff",
                "--expopage-download-button-hoverbg":"#188916b6",

                "--expopage-present-button-bg":"#e95922",
                "--expopage-present-button-color":"#fff",
                "--expopage-present-button-hoverbg":"#e95a22b4",
                "--expopage-present-button-disabledbg":"#e95a2256",

                "--expopage-heart-button-bg":"#e166cc",
                "--expopage-heart-button-color":"#fff",
                "--expopage-heart-button-hoverbg":"#e166ccb0",
                "--expopage-heart-button-disabledbg":"#e166cc56",

                "--expopage-viewcounter-bg":"#065ed1",
                "--expopage-viewcounter-color":"#fff",

                "--expopage-share-button-bg":"#31beff",
                "--expopage-share-button-color":"#fff",
                "--expopage-share-button-hoverbg":"#31beff9c",

                "--expopage-report-button-bg":"#ff3131",
                "--expopage-report-button-color":"#fff",
                "--expopage-report-button-hoverbg":"#ff313180",

                "--expopage-categ-bg":"#838082",
                "--expopage-categ-color":"#fff",
                "--expopage-categ-hoverbg":"#838082a9"
            },
    "blue":
            {
                "--expopage-body-bg":"black",
                "--expopage-bgcolor":"black",
                "--expopage-color":"white",
                "--expopage-color-h2":"white",
                "--expopage-color-h3":"white",
                "--expopage-color-p":"white",
                "--expopage-actualcontent-color":"#b3b3b3",
                "--expopage-color-small":"#b3b3b3",
                "--expopage-color-small-a":"#0071eb",
                "--expopage-form-input-accent":"#b3b3b3",

                "--expopage-previewclose-color":"#878787",
                "--expopage-previewclose-bg":"#f2f3fb",
                "--expopage-previewclose-bghover":"#ebedf9",

                "--expopage-download-button-bg":"#188916",
                "--expopage-download-button-color":"#fff",
                "--expopage-download-button-hoverbg":"#188916b6",

                "--expopage-present-button-bg":"#e95922",
                "--expopage-present-button-color":"#fff",
                "--expopage-present-button-hoverbg":"#e95a22b4",
                "--expopage-present-button-disabledbg":"#e95a2256",

                "--expopage-heart-button-bg":"#e166cc",
                "--expopage-heart-button-color":"#fff",
                "--expopage-heart-button-hoverbg":"#e166ccb0",
                "--expopage-heart-button-disabledbg":"#e166cc56",

                "--expopage-viewcounter-bg":"#065ed1",
                "--expopage-viewcounter-color":"#fff",

                "--expopage-share-button-bg":"#31beff",
                "--expopage-share-button-color":"#fff",
                "--expopage-share-button-hoverbg":"#31beff9c",

                "--expopage-report-button-bg":"#ff3131",
                "--expopage-report-button-color":"#fff",
                "--expopage-report-button-hoverbg":"#ff313180",

                "--expopage-categ-bg":"#838082",
                "--expopage-categ-color":"#fff",
                "--expopage-categ-hoverbg":"#838082a9"
            }
}

async function select_theme(theme) {
    console.log(theme + " theme is being selected.")
    var selected_theme = themes[theme]
    if (selected_theme == undefined) {
        await littlePopup({text:"Ce thème " + theme + "n'existe pas !", icon:"error"});
    }
    var new_css = "";
    for (var key in selected_theme) {
        new_css += key + ": " + selected_theme[key] + ";\n"
    }
    document.body.style = new_css
    console.log(new_css)
};
window.select_theme = select_theme;

async function ctp() {
    await Swal.fire({
        title: 'Choisis un thème',
        icon: 'question',
        input: "select",
        inputOptions: {
            "dark": "Sombre",
            "light": "Clair",
            "blue": "Bleu",
        },
        inputPlaceholder: "...",
        inputValidator: (value) => {
          return new Promise(async (resolve) => {
            if (value === "") {
              resolve("Tu dois sélectionner un thème !");
            } else {
              await select_theme(value)
              await littlePopup({text:"Changement de thème effectué.", icon:"success"});
              resolve();
            }
          });
        }
    });
};
window.ctp = ctp;

export async function detect_user_theme() {
    var actual_user = await get_connected_user_info();
    var actual_user_uuid = actual_user.uid
    var actual_userDoc = await get_user_from_uuid(actual_user_uuid);
    var result = actual_userDoc["settings"]["theme"]
    console.log("Detected the " + result + " theme as in user settings!")
    return result
};
window.detect_user_theme = detect_user_theme;

select_theme("dark");
var user_theme = await detect_user_theme();
var isconnected = await is_connected();
if (isconnected == true && user_theme != undefined) {
    console.log("About to apply the " + user_theme + " theme here...")
    select_theme(user_theme);
}