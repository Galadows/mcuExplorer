<template>
  <div class="text-white text-sm cursor-pointer select-none" @click="toggleValue()">
    <span :class="{ 'text-marvel-red': !value, 'opacity-40': value }">{{
      falseOption
    }}</span>
    /
    <span :class="{ 'text-marvel-red': value, 'opacity-40': !value }">{{
      trueOption
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: ['trueOption', 'falseOption'],
  data() {
    return {
      value: false,
    }
  },
  methods: {
    toggleValue() {
      this.value = !this.value
      this.$emit('input', this.value)
    },
  },
}
</script>
