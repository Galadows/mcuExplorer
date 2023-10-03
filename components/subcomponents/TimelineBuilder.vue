<template>
  <div class="flex h-full items-center">
    <div class="h-1 w-1 bg-marvel-red"></div>
    <div
      v-for="data in content"
      :key="data.id"
      class="md:min-w-[24rem] min-w-[18rem] h-1 flex items-center justify-center bg-marvel-red relative"
    >
      <div
        class="rounded-full bg-black border-2 border-marvel-red w-5 h-5 absolute flex items-center justify-center"
      >
        <div
          class="absolute -top-10 flex items-center justify-center h-10 w-10 text-white opacity-70"
        >
          {{ data.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {type: Array}
  },
  data(){
    return{

    }
  }
}
</script>
