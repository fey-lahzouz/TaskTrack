<script setup>
import { ref } from 'vue';

// Define props without type annotations
const props = defineProps({
  label: String,
  errors: Array
});
</script>

<template>
  <label for="">{{ props.label }}</label>
  <div :class="{ error: props.errors.length }">
    <slot></slot>
    <div
      class="input-errors"
      v-for="error in props.errors"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>

<style scoped>
.input-errors {
  color: red;
}
</style>
