<script setup>
const props = defineProps({
  type: String,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

function updateValue(event) {
  const val = event.target.value;
  emit('update:modelValue', val);
  // console.log(val)
}
</script>

<template>
  <input
    :value="props.modelValue"
    :type="typeof props.type === 'undefined' ? 'text' : props.type"
    class="form-control"
    @input="updateValue"
    placeholder=""
  />
</template>
