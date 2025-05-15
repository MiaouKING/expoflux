import { getAPIs } from "/expoflux/js/APIs.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const APIs = getAPIs();
window.APIs = APIs;

export async function get_connected_user_info() {
        return new Promise((resolve) => {
              onAuthStateChanged(APIs.auth, (user) => {
                if (user) {
                  resolve(user);
                } else {
                  resolve(null);
                }
              });
            });
};
window.get_connected_user_info = get_connected_user_info;