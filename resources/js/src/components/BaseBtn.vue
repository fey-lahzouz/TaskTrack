<script setup>
const props = defineProps({
  loading: Boolean,
  label: String
});
</script>

<template>
  <button :disabled="props.loading" class="btn btn-primary w-100">
    <span v-if="!props.loading">{{ props.label }}</span>
    <div v-if="props.loading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </button>
</template>