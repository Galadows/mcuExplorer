<template>
  <div
    class="text-white text-sm cursor-pointer select-none"
    :name="label"
    @click="toggleValue()"
  >
    <template v-if="tickable">
      <div class="flex justify-center items-center space-x-2">
        <label class="cursor-pointer" :for="label"> {{ label }}</label>
        <div
          class="h-3 w-3 border border-white flex justify-center items-center p-2"
        >
          <fa v-if="value" icon="check" class="text-marvel-red" />
        </div>
      </div>
    </template>
    <template v-else>
      <span :class="{ 'text-marvel-red': !value, 'opacity-40': value }">{{
        falseOption
      }}</span>
      /
      <span :class="{ 'text-marvel-red': value, 'opacity-40': !value }">{{
        trueOption
      }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: ['trueOption', 'falseOption', 'value', 'tickable', 'label'],
  methods: {
    toggleValue() {
      this.value = !this.value
      this.$emit('input', this.value)
    },
  },
}
</script>
