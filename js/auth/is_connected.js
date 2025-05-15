import { getAPIs } from "/expoflux/js/APIs.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const APIs = getAPIs();
window.APIs = APIs;

export async function is_connected() {
  return new Promise((resolve) => {
      onAuthStateChanged(APIs.auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
};
window.is_connected = is_connected;