<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { loginInput, useLoginUser } from "./actions/login";

// Validation rules
const rules = {
  email: { required, email },
  password: { required },
};

// Initialize Vuelidate with the rules and login input state
const v$ = useVuelidate(rules, loginInput);

// Destructure loading and login from the useLoginUser composable
const { loading, login } = useLoginUser();

// Define an asynchronous function to handle login submission
async function submitLogin() {
  // Validate the form data using Vuelidate
  const result = await v$.value.$validate();

  // If validation fails, exit the function
  if (!result) return;

  // If validation passes, proceed to login
  await login();

  // Reset the form validation state
  v$.value.$reset();
}
</script>

<template>
  <div class="row">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h2 align="center">Login</h2>
            <br />
            <br />
            <form @submit.prevent="submitLogin">
              <div class="form-group">
                <Error label="E-mail" :errors="v$.email.$errors">
                  <BaseInput v-model="loginInput.email" />
                </Error>
              </div>
              <div class="form-group">
                <Error label="Password" :errors="v$.password.$errors">
                  <BaseInput v-model="loginInput.password" />
                </Error>
              </div>
              <br />
              <div class="form-group">
                <RouterLink to="/register">Create an account</RouterLink>
              </div>
              <div class="form-group">
                <BaseBtn label="Login" :loading="loading" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>
