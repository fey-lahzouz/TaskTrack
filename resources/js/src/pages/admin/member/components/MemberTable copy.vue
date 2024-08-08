<template>
    <div class="row">
        <div class="col-md-4">
            {{ loading }}
            <input
                type="text"
                @keydown="search"
                v-model="query"
                placeholder="search..."
                class="form-control"
            />
            <br />
            <!-- Mostra un messaggio di caricamento se la proprietà 'loading' è vera -->
            <span style="color: blue"  v-show="loading === true ? true : false">
                <b>Searching....</b>
            </span>
        </div>
    </div>
    <br />
    <br />

    <table class="table table-bordered">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
        </tr>
        <tr v-for="member in members.data?.data" :key="member.id">
            <td>{{ member.id }}</td>
            <td>{{ member.name }}</td>
            <td>{{ member.email }}</td>
            <td>
                <button
                    class="btn-sm btn-primary"
                    @click="emit('editMember', member)"
                >
                    Edit
                </button>
            </td>
        </tr>
    </table>
</template>
<script lang="js" setup>

import { ref } from "vue";
import { myDebounce } from "../../../../helper/util";

defineProps({
    members: Object, // In assenza di tipi, possiamo indicare il tipo generico 'Object'.
    loading: Boolean
});

// Definisci gli eventi emessi dal componente
const emit = defineEmits(["editMember", "getMember"]);

// Crea una variabile reattiva per la query di ricerca
const query = ref("");

// Funzione di ricerca con debounce per ritardare l'esecuzione fino a quando l'utente ha finito di digitare
const search = myDebounce(async function () {
    // Emette l'evento 'getMember' passando la pagina e la query
    await emit("getMember", 1, query.value);
}, 200);
</script>
