<template>
  <div class="select-none relative" :tabindex="tabindex" @blur="open = false">
    <div
      class="border-b relative border-b-white px-1 max-w-full h-fit text-white cursor-default"
      @click="open = !open"
    >
    <div class="h-0 w-0 absolute border-4 border-transparent  right-1 top-1/2" :class="{'border-t-white': !open, 'border-b-white': open}"></div>
      {{ selected.label }}
    </div>
    <div v-show="open" class="absolute bg-white w-full flex flex-col p-1 z-10">
      <p class="hover:bg-marvel-red hover:text-white" :class="{'text-marvel-red': option.value == selected.value}" v-for="option in options" :key="option.value" @click="select(option)">{{ option.label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    }
  },
  methods: {
    select(option){
      this.selected = option
      this.open = false
      this.$emit('input', option.value)
    }
  }
}
</script>
