import { ref } from "vue";
import { makeHttpReq } from "../../../../helper/makeHttpReq";
import { successMsg } from "../../../../helper/toast-notification";
import { showErrorResponse } from "../../../../helper/util";
import { memberStore } from "../store/memberStore";

// Funzione per creare o aggiornare un membro
export function useCreateOrUpdateMember() {
    // Variabile reattiva per tenere traccia dello stato di caricamento
    const loading = ref(false);

    // Funzione asincrona per creare o aggiornare un membro
    async function createOrUpdate() {
        try {
            loading.value = true; // Imposta lo stato di caricamento a true

            // Determina se chiamare createMember o updateMember in base allo stato di `edit`
            const data = memberStore.edit
                ? await updateMember() // Se in modalità modifica, aggiorna il membro
                : await createMember(); // Altrimenti, crea un nuovo membro

            loading.value = false; // Imposta lo stato di caricamento a false

            // Resetta i dati di input del membro dopo l'operazione
            memberStore.memberInput = {};

            // Mostra un messaggio di successo con la risposta dal server
            successMsg(data.message);
        } catch (error) {
            loading.value = false; // Imposta lo stato di caricamento a false in caso di errore
            showErrorResponse(error); // Mostra un messaggio di errore
        }
    }

    return { createOrUpdate, loading };
}

// Funzione asincrona per creare un nuovo membro
async function createMember() {
    // Effettua una richiesta HTTP per creare un membro
    const data = await makeHttpReq("members", "POST", memberStore.memberInput);
    return data; // Ritorna la risposta dal server
}

// Funzione asincrona per aggiornare un membro esistente
async function updateMember() {
    // Effettua una richiesta HTTP per aggiornare un membro
    const data = await makeHttpReq("members", "PUT", memberStore.memberInput);

    // Imposta lo stato di `edit` a false dopo l'aggiornamento
    memberStore.edit = false;
    return data; // Ritorna la risposta dal server
}
