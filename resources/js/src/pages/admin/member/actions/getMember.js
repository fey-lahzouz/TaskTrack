import { ref } from "vue";
import { makeHttpReq } from "../../../../helper/makeHttpReq";
import { showErrorResponse } from "../../../../helper/util";

// Funzione per ottenere i membri dal server
export function useGetMembers() {
    // Stato di caricamento per tracciare se la richiesta è in corso
    const loading = ref(false);

    // Dati dei membri recuperati dal server
    const memberData = ref({}); // Usa un oggetto vuoto al posto del tipo specifico

    // Funzione asincrona per ottenere i membri
    async function getMembers(page = 1, query = "") {
        try {
            loading.value = true; // Imposta lo stato di caricamento su vero
            // Effettua una richiesta HTTP per ottenere i dati dei membri
            const data = await makeHttpReq(
                `members?query=${query}&page=${page}`,
                "GET"
            );
            loading.value = false; // Imposta lo stato di caricamento su falso
            memberData.value = data; // Memorizza i dati dei membri recuperati
        } catch (error) {
            loading.value = false; // Imposta lo stato di caricamento su falso in caso di errore
            showErrorResponse(error); // Mostra un messaggio di errore
        }
    }

    // Ritorna la funzione getMembers e lo stato per essere usati nel componente
    return { getMembers, memberData, loading };
}
