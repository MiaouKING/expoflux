import { getAPIs } from "/js/APIs.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { logout } from "/js/auth/logout.js";
import { get_user_from_uuid } from "/js/expo-page/get-user-from-uuid.js"

const APIs = getAPIs();
window.APIs = APIs;

export async function add_profile_banner() {
  const mainNav = document.getElementById("mainNav");

  onAuthStateChanged(APIs.auth, async (user) => {
    if (user) {
        console.log(user);
        window.u = user;
        var userDoc = await get_user_from_uuid(user.uid);
        const date = userDoc.date.toDate() //Date à laquelle l'user a été publié

        var year = date.getFullYear();
        var month;
        switch (date.getMonth()) {
            case 0:
                month = "Janvier";
                break
            case 1:
                month = "Février";
                break
            case 2:
                month = "Mars";
                break
            case 3:
                month = "Avril";
                break
            case 4:
                month = "Mai";
                break
            case 5:
                month = "Juin";
                break
            case 6:
                month = "Juillet";
                break
            case 7:
                month = "Août";
                break
            case 8:
                month = "Septembre";
                break
            case 9:
                month = "Octobre";
                break
            case 10:
                month = "Novembre";
                break
            case 11:
                month = "Décembre";
                break
        }
        var day = date.getDate();

        var date_label = "Créé le " + day + " " + month + " " + year;



        mainNav.innerHTML = mainNav.innerHTML + `<a href="dashboard.html"><div class="profile-banner">
                                                              <img class="profile-icon" src="assets/def_pfp.png">
                                                              <div class="profile-banner-text">
                                                                  <div class="profile-name">` + user.displayName + `</div>
                                                                  <br>
                                                                  <div class="profile-email">` + date_label + `</div>
                                                              </div>
                                                          </div></a><link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.4.2/uicons-bold-rounded/css/uicons-bold-rounded.css'><i class="fi fi-br-exit" onclick="logout();"></i>`;
    }
  });
};
window.add_profile_banner = add_profile_banner;

if (window.onload == null) {
    window.onload = add_profile_banner;
} else {
    var already_defined_onload = window.onload;

    window.onload = () => {add_profile_banner(); already_defined_onload();};
}
