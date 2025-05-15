import { getAPIs } from "/expoflux/js/APIs.js";
import { get_connected_user_info } from "/expoflux/js/auth/get-connected-user-info.js"

const APIs = getAPIs();
window.APIs = APIs;

export async function check_if_connected() {
    const mainNav = document.getElementById("mainNav");

    var user = get_connected_user_info()
    if (user) {
        return;
    } else {
        Swal.fire({
            title: 'Erreur',
            text: "Tu n'es pas connecté",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Se connecter',
            cancelButtonText: "Créer un compte",
            allowOutsideClick : false,
            allowEscapeKey : false,
            allowEnterKey : false
        }).then((result) => {
            if (result.isConfirmed) {
                location.href = 'login.html';
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                location.href = 'signup.html';
            }
        });
    }
};
window.check_if_connected = check_if_connected;

if (window.onload == null) {
    window.onload = check_if_connected;
} else {
    var already_defined_onload = window.onload;

    window.onload = () => {check_if_connected(); already_defined_onload();};
}