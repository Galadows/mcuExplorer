<template>
  <div
  id="timeline"
    class="flex bg-black h-screen w-screen overflow-x-scroll overflow-y-hidden scrollbar-hidden snap-x"
  >
    <div
      class="flex flex-row justify-center items-center relative left-1/2"
    >
      <div
        class="h-1 md:w-96 w-72 bg-marvel-red flex items-center snap-center"
        v-for="(movie,index) in movies"
        :key="movie.title + '-Timeline'"
      >
        <div
          class="h-4 w-4 border-2 relative right-3 bg-black border-marvel-red hover:border-white rounded-full"
        >
          <div class="flex flex-col relative right-28 justify-center items-center w-56 text-center" :class="{'md:-top-96 -top-72': index%2 == 0, 'top-6': index%2 != 0}">
            <img
              :key="movie.title"
              :src="movie.cover_url"
              :alt="movie.title + ' cover'"
              class="md:h-64 h-40 m-5"
              :class="{'hidden': index%2 != 0}"
            />
            <h3 class="flex text-white h-16 items-center">{{ movie.title }}</h3>
            <img
              :key="movie.title"
              :src="movie.cover_url"
              :alt="movie.title + ' cover'"
              class="md:h-64 h-40 m-5"
              :class="{'hidden': index%2 == 0}"
            />
          </div>
        </div>
      </div>
      <div class="w-screen/2 h-screen"></div>
    </div>
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'

export default {
  name: 'Timeline',
  async mounted() {},
  props: ['movies'],

  data() {
    return {
      upBannerHover: false,
      downBannerHover: false,
    }
  },
  methods: {},
  computed: {},
}
</script>
