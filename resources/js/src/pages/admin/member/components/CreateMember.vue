<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h3>Create Members</h3>
                <br />
                <br />
                {{ memberStore.edit }}
                <!-- Modulo per creare o aggiornare i membri -->
                <form @submit.prevent="submitMember">
                    <div class="form-group">
                        <!-- Campo di input per il nome con gestione degli errori -->
                        <Error label="Name" :errors="v$.name.$errors">
                            <BaseInput v-model="memberStore.memberInput.name" />
                        </Error>
                    </div>
                    <div class="form-group">
                        <!-- Campo di input per l'email con gestione degli errori -->
                        <Error label="E-mail" :errors="v$.email.$errors">
                            <BaseInput
                                v-model="memberStore.memberInput.email"
                            />
                        </Error>
                    </div>
                    <br />
                    <RouterLink to="/members">See Members List</RouterLink>
                    <br />
                    <div class="form-group">
                        <BaseBtn
                            :label="
                                memberStore.edit
                                    ? 'Update'
                                    : 'Create'
                            "
                            :class="
                                memberStore.edit
                                    ? 'btn btn-sm btn-warning'
                                    : 'btn btn-sm btn-primary'
                            "
                            :loading="loading"
                        />
                    </div>
                    <div class="form-group">
                        <!-- Bottone per inviare il modulo, cambia etichetta e stile in base alla modalità -->
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="js" setup>

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useCreateOrUpdateMember } from "../actions/createMember";
import { memberStore } from "../store/memberStore";

// Validation rules
const rules = {
  email: { required, email },
  name: { required },
};

// Initialize Vuelidate with the rules and login input state
const v$ = useVuelidate(rules, memberStore.memberInput);
const { loading, createOrUpdate } = useCreateOrUpdateMember(); // Estrae lo stato di caricamento e la funzione per creare/aggiornare il membro

// Define an asynchronous function to handle login submission


// Define an asynchronous function to handle login submission
async function submitMember() {
  // Validate the form data using Vuelidate
  const result = await v$.value.$validate();

  // If validation fails, exit the function
  if (!result) return;

  // If validation passes, proceed to login
  await createOrUpdate();

  // Reset the form validation state
  v$.value.$reset();
}
</script>
