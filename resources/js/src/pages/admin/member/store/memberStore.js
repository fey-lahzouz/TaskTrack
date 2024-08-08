import { defineStore } from "pinia"; // Importa la funzione defineStore da Pinia per definire un negozio di stato

// Definisci il negozio di stato per i membri
const useMemberStore = defineStore("member", {
    // Stato iniziale del negozio
    state: () => ({
        memberInput: {}, // Inizializza l'input del membro come un oggetto vuoto
        edit: false, // Inizializza lo stato di modifica come falso
    }),
});

// Crea un'istanza del negozio di stato
export const memberStore = useMemberStore();
