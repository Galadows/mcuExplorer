<template>
  <div
    id="timeline"
    class="flex bg-black h-screen w-screen overflow-x-scroll overflow-y-hidden scrollbar-hidden scroll-smooth"
  >
    <div class="flex flex-row justify-center items-center">
      <div class="w-screen/2 h-screen flex flex-1 flex-col items-center">
        <div>
          <h1 class="text-white mt-20 pr-56 font-extrabold">MCU Timeline</h1>
          <p class="text-white">TODO</p>
        </div>
      </div>
      <div
        class="h-1 md:w-96 w-72 bg-marvel-red flex items-center"
        v-for="(movie, index) in movies"
        :key="movie.title + '-Timeline'"
        @mouseenter="movie.id == selected ? $emit('unselect') : null"
      >
        <div
          class="h-4 w-4 border-2 relative right-3 bg-black border-marvel-red hover:border-white rounded-full"
        >
          <!-- <div
            class="h-4 w-4 border-2 relative top-[-2px] right-[2px] bg-black border-marvel-red hover:border-white rounded-full"
            :class="{
              'animate-ping border-white': selected == movie.id,
              hidden: selected != movie.id,
            }"
            style="scroll-margin-top: 50vh"
          /> -->
          <!-- <div
            class="relative right-[50vw]"
            :id="movie.id"
          /> -->
          <div
            :id="movie.id"
            class="flex flex-col relative right-28 justify-center items-center w-56 text-center"
            :class="{
              'md:top-[-25rem] -top-72': index % 2 == 0,
              'top-6': index % 2 != 0,
            }"
          >
            <img
              :src="movie.cover_url"
              :alt="movie.title + ' cover'"
              class="md:h-64 h-40 m-5 border border-marvel-red"
              :class="{ hidden: index % 2 != 0 }"
            />
            <h1
              class="text-white font-extrabold"
              :class="{ hidden: index % 2 == 0 }"
            >
              {{
                movie.release_date
                  ? moment(movie.release_date).format('MMMM Do YYYY')
                  : 'TBA'
              }}
            </h1>
            <h3 class="flex text-white h-16 items-center">{{ movie.title }}</h3>
            <h1
              class="text-white font-extrabold"
              :class="{ hidden: index % 2 != 0 }"
            >
              {{
                movie.release_date
                  ? moment(movie.release_date).format('MMMM Do YYYY')
                  : 'TBA'
              }}
            </h1>
            <img
              :src="movie.cover_url"
              :alt="movie.title + ' cover'"
              class="md:h-64 h-40 m-5 border border-marvel-red"
              :class="{ hidden: index % 2 == 0 }"
            />
          </div>
        </div>
      </div>
      <div class="border-marvel-red" style="" />
      <div class="w-screen/2 h-screen"></div>
    </div>
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'
import moment from 'moment'

export default {
  name: 'Timeline',
  async mounted() {},
  props: ['movies', 'selected'],

  data() {
    return {
      upBannerHover: false,
      downBannerHover: false,
      moment: moment,
    }
  },
  methods: {
    unselect() {
      this.$event('unselect')
    },
  },
  computed: {},
}
</script>
