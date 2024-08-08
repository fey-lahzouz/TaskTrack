<script setup>
import { onMounted, ref } from "vue";
//import ApexDonut from "./components/ApexDonut.vue";
//import ApexRadialBar from "./components/ApexRadialBar.vue";
//import { useGetPinnedProject } from "./actions/GetPinnedProject";
//import { useGetTotalProject } from "./actions/countProject";
//import { useGetChartData } from "./actions/getChartData";

// Destructure and get project and methods from composables
//const { project, getPinnedProject } = useGetPinnedProject();
//const { countProject, getTotalProject } = useGetTotalProject();
//const { chartData, getChartData } = useGetChartData();

// Fetch data when the component is mounted
onMounted(async () => {
    //await getPinnedProject(); // Get the pinned project details
    //getChartData(project.value.id); // Fetch chart data using project ID
    //getTotalProject(); // Get the total number of projects
});
</script>

<template>
    <div class="row">
        <h2>Dashboard</h2>
    </div>
</template>
