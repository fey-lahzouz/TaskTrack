<script lang="js" setup>
import { onMounted } from "vue";
import MemberTable from "./components/MemberTable.vue";
import { useRouter } from "vue-router";
import { memberStore } from "./store/memberStore";
import { useGetMembers } from "./actions/GetMember";

// Destruttura le proprietà restituite da useGetMembers
const { getMembers, loading, memberData } = useGetMembers();

// Funzione per mostrare la lista dei membri
async function showListOfMembers() {
    await getMembers(); // Attendi il completamento della chiamata per ottenere i membri
}

const router = useRouter(); // Ottieni l'istanza del router

// Funzione per modificare un membro
function editMember(member) {
    memberStore.memberInput = member; // Imposta il membro selezionato nello store
    memberStore.edit = true; // Imposta la modalità di modifica su true
    router.push('/create-members'); // Reindirizza alla pagina di creazione/modifica dei membri
}

onMounted(async () => {
    showListOfMembers(); // Mostra la lista dei membri al montaggio del componente
    memberStore.edit = false; // Reimposta la modalità di modifica su false
    memberStore.memberInput = {}; // Resetta l'input del membro nello store
});
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">
                        Members
                        <RouterLink
                            style="float: right"
                            to="/create-members"
                            class="btn btn-primary"
                        >
                            Create Member
                        </RouterLink>
                    </div>
                    <div class="card-body">
                        <!-- Componente per visualizzare la tabella dei membri -->
                        <MemberTable
                            @editMember="editMember"
                            :loading="loading" 
                            @getMember="getMembers" 
                            :members="memberData"
                        >
                            <!-- Slot per la paginazione -->
                            <template #pagination>
                                <Bootstrap5Pagination 
                                    v-if="memberData?.data" 
                                    :data="memberData?.data"
                                    @pagination-change-page="getMembers" 
                                />
                            </template>
                        </MemberTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
