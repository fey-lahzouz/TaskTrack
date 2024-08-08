import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";
import { showErrorResponse } from "../../../helper/util";

// Funzione per gestire il logout dell'utente
export function useLogoutUser() {
    // Variabile reattiva per tenere traccia dello stato di caricamento
    const loading = ref(false);

    // Funzione asincrona per effettuare il logout
    async function logout(userId) {
        try {
            loading.value = true; // Imposta lo stato di caricamento a true

            // Effettua una richiesta HTTP per il logout
            const data = await makeHttpReq("logout", "POST", {
                userId: userId,
            });

            // Imposta lo stato di caricamento a false dopo la risposta
            loading.value = false;

            // Gestisci il messaggio di successo (può essere visualizzato un messaggio all'utente qui)
            successMsg(data.message);
        } catch (error) {
            console.log(error); // Stampa l'errore nella console

            // Mostra una risposta d'errore all'utente
            showErrorResponse(error);

            // Se l'errore riguarda l'autenticazione, reindirizza alla pagina di login
            if (error.message === "Not authenticated") {
                window.location.href = "/app/login"; // Reindirizzamento alla pagina di login
            }

            loading.value = false; // Imposta lo stato di caricamento a false in caso di errore
        }
    }

    return { logout, loading };
}
