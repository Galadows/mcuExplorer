<template>
  <div
    class="flex flex-col justify-center items-center bg-black h-screen w-screen overflow-hidden"
  >
  
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'

export default {
  name: 'Timeline',
  async mounted() {

  },
  data() {
    return {
      movies: [],
      upBannerHover: false,
      downBannerHover: false,
    }
  },
  methods: {},
  computed: {

  },
}
</script>
