<script lang="js" setup>
import { onMounted } from 'vue';
import { getUserData } from '../../helper/getUserData';
import { useLogoutUser } from './actions/Logout';
import NavBar from './components/NavBar.vue';

// Estrae la funzione logout dal composable useLogoutUser
const { logout } = useLogoutUser();

// Ottiene i dati dell'utente attuale
const userData = getUserData();

// Funzione per gestire il logout dell'utente attivo
async function logoutUser() {
  const userId = userData?.user?.id; // Ottiene l'ID dell'utente se esiste
  if (typeof userId !== 'undefined') {
    await logout(userId); // Effettua il logout passando l'ID dell'utente
    localStorage.clear(); // Pulisce il localStorage per rimuovere i dati utente
    setTimeout(() => window.location.href = "/app/login", 1000); // Reindirizza alla pagina di login dopo 1 secondo
  }
}

// Funzione per tentare il logout quando l'utente non è identificato
async function tryLogoutUser() {
  await logout(undefined); // Chiama il logout senza un ID utente specifico
}

// Esegue la funzione tryLogoutUser quando il componente viene montato
onMounted(async () => {
  await tryLogoutUser();
});
</script>

<template>
  <div class="container">
    <div class="container-fluid">
      <div class="row">
        <!-- NavBar componente che mostra l'email dell'utente loggato e gestisce il logout -->
        <NavBar :loggedInUserEmail="userData?.user.email" @logout="logoutUser" />

        <!-- Main content della pagina -->
        <main class="col-md-9 ms-sm-auto col-lg-10 bg-pages">
          <br /><br />
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <div :key="route.name">
                <component :is="Component"></component>
              </div>
            </transition>
          </router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
/* Stili per le transizioni di fade */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* Stili per la barra di navigazione */

.navbar-nav .nav-item img {
  padding: 10px;
  border-radius: 25px;
  position: relative;
  right: 20px;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #212529;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}

body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

/* Stili per la sidebar */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  /* Contenuto scrollabile se la viewport è più corta del contenuto. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/* Stili per la barra di navigazione superiore */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
