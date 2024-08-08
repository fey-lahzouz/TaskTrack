<script lang="js" setup>
import { ref } from "vue";
import { myDebounce } from "../../../../helper/util"; // Assicurati che questa importazione sia corretta e che myDebounce sia definito

// Definisci le proprietà ricevute dal componente padre
defineProps({
  members: Object, // In assenza di tipi TypeScript, si usa Object per rappresentare un tipo generico
  loading: Boolean // Rappresenta lo stato di caricamento
});

// Definisci gli eventi emessi dal componente
const emit = defineEmits(["editMember", "getMember"]);

// Crea una variabile reattiva per la query di ricerca
const query = ref("");

// Funzione di debounce per ritardare l'esecuzione della ricerca fino a quando l'utente ha finito di digitare
const search = myDebounce(async function () {
    // Emette l'evento 'getMember' passando la pagina e la query
    console.log(query.value);
  await emit("getMember", 1, query.value);
}, 200);

</script>

<template>
  <div class="row">
    <div class="row">
      <div>
        <!-- Campo di input per la ricerca con v-model per il binding bidirezionale -->
         
        <input
          type="text"
          @keydown="search"  
          v-model="query"
          placeholder="search..."
          class="form-control"
        />
        <!-- Mostra un messaggio di caricamento se la proprietà 'loading' è vera -->
        <span
          style="color: blue"
          v-show="loading"
        >
          <b>Searching....</b>
        </span>
      </div>
    </div>
    <br />
    <br />

    <div class="row">
      <!-- Tabella per visualizzare l'elenco dei membri -->
      <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          <!-- Cicla attraverso la lista dei membri e visualizza ogni membro -->
          <tr v-for="member in members?.data?.data" :key="member.id">
            <td>{{ member.id }}</td>
            <td>{{ member.name }}</td>
            <td>{{ member.email }}</td>
            <td>
              <!-- Pulsante per modificare un membro -->
              <button
                @click="emit('editMember', member)"
                class="btn btn-sm btn-warning"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
