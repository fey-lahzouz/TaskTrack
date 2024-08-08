<script setup>
import { onMounted, ref } from "vue"; // Import necessary functions from Vue
import { RouterLink } from "vue-router"; // Import RouterLink to create navigation links
import { APP } from "../../../App/APP"; // Import a constant APP which contains application-specific settings

// Define a reactive variable `navigation` that contains the navigation menu items
const navigation = ref([
    {
        name: "Dashboard", // Name of the menu item
        link: "/admin", // Route path for the menu item
        icon: "bi bi-wrench-adjustable", // Icon class for the menu item
    },
    {
        name: "Projects",
        link: "/projects",
        icon: "bi bi-file-ppt",
    },
    {
        name: "Members",
        link: "/members",
        icon: "bi bi-file-ppt",
    },
]);

// Define the `emit` function for emitting custom events
// This is used to communicate events from the child component to the parent component
const emit = defineEmits(["logout"]); // Define an event 'logout' that can be emitted

// Define props for the component
// Props are passed from parent components and should be considered as read-only
defineProps({
    loggedInUserEmail: String, // This prop holds the logged-in user's email
});
</script>

<template>
    <nav
        id="sidebarMenu"
        style="background-color: white"
        class="col-md-3 col-lg-2 d-md-block sidebar collapse"
    >
        <div class="position-sticky pt-3">
            <div align="center">
                <!-- Display application logo and name -->
                <img
                    :src="`${APP.baseURL}/others/logo.png`"
                    style="height: 55px"
                    alt=""
                />
                <h4>TaskMgr</h4>
                <!-- Display the logged-in user's email -->
                {{ loggedInUserEmail }}
            </div>
            <br />
            <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
                
                <!-- Placeholder for an additional menu action -->
                <a
                    class="link-secondary"
                    href="#"
                    aria-label="Add a new report"
                >
                    <span data-feather="plus-circle"></span>
                </a>
            </h6>
            <ul class="nav flex-column">
                <!-- Loop through the navigation items and create a link for each -->
                <li class="nav-item" v-for="nav in navigation" :key="nav.name">
                    <RouterLink class="nav-link" :to="nav.link" exact>
                        <i :class="nav.icon"></i>
                        {{ nav.name }}
                    </RouterLink>
                </li>

                <!-- Create a logout link that emits a 'logout' event when clicked -->
                <li
                    class="nav-item"
                    style="cursor: pointer"
                    @click="emit('logout')"
                >
                    <a class="nav-link">
                        <i class="bi bi-box-arrow-right"></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style>
/* Styles for active links */
a.router-link-active.router-link-exact-active.nav-link {
    color: white;
}

/* Styles for nav items when active */
.nav-item .router-link-exact-active {
    border-radius: 5px;
    box-shadow: 1px 1px 5px 1px #69757d;
    background: #2470dc;
    color: #fff;
}
</style>
