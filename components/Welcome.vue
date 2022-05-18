<template>
  <div
    class="flex border-white border-4 flex-col justify-center items-center h-screen w-screen bg-marvel-red overflow-hidden"
  >
    <div
      class="flex flex-1 justify-center items-center animate-infinite-scroll"
      :class="{ pause: upBannerHover }"
    >
      <img
        @mouseenter="upBannerHover = true"
        @mouseleave="upBannerHover = false"
        v-for="movie in covers"
        :key="movie.title"
        :src="movie.cover_url"
        :alt="movie.title + ' cover'"
        class="md:h-64 h-40 md:w-4/5 m-10 animate-fade-in"
      />
      <img
        @mouseenter="upBannerHover = true"
        @mouseleave="upBannerHover = false"
        v-for="movie in covers"
        :key="movie.title"
        :src="movie.cover_url"
        :alt="movie.title + ' cover'"
        class="md:h-64 h-40 md:w-4/5 m-10 animate-fade-in"
      />
    </div>

    <div class="flex flex-2 flex-row">
      <a
        @mouseenter="buttonHover = true"
        @mouseleave="buttonHover = false"
        class="font-bold text-white md:w-[3rem] md:text-3xl text-xl md:p-5 p-2 m-2 border-2 cursor-pointer smooth-scroll"
        href="#timeline"
      >
        {{ buttonHover ? 'Welcome to MCU Explorer' : 'Explore the MCU'}}
      </a>
    </div>
    <div
      class="flex flex-1 justify-center items-center animate-infinite-scroll-inverted"
      :class="{ pause: downBannerHover }"
    >
      <img
        @mouseenter="downBannerHover = true"
        @mouseleave="downBannerHover = false"
        v-for="movie in covers"
        :key="movie.title"
        :src="movie.cover_url"
        :alt="movie.title + ' cover'"
        class="md:h-64 h-40 md:w-4/5 m-10 cursor-pointer animate-fade-in"
      />
      <img
        @mouseenter="downBannerHover = true"
        @mouseleave="downBannerHover = false"
        v-for="movie in covers"
        :key="movie.title"
        :src="movie.cover_url"
        :alt="movie.title + ' cover'"
        class="md:h-64 h-40 md:w-4/5 m-10 cursor-pointer animate-fade-in"
      />
    </div>
    <!-- <img v-for="movie in movies" :key="movie.title" :src="movie.cover_url" :alt="movie.title + ' cover'" class="h-20"> -->
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'

export default {
  name: 'Welcome',
  async mounted() {
    this.movies = await marvelAPI.getMovies(null, 'title,cover_url')
  },
  data() {
    return {
      movies: [],
      buttonHover: false,
      upBannerHover: false,
      downBannerHover: false,
    }
  },
  methods: {},
  computed: {
    covers() {
      let moviesWithCovers = []
      this.movies.forEach((movie) => {
        if (movie.cover_url) {
          moviesWithCovers.push(movie)
        }
      })
      return moviesWithCovers
    },
  },
}
</script>
