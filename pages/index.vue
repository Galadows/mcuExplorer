<template>
  <div class="m-0 p-0 max-w-screen overflow-hidden scrollbar-hidden">
    <Welcome />
    <Timeline :movies="covers"/>
  </div>
</template>

<script>
import Timeline from '~/components/Timeline.vue'
import marvelAPI from '../api/marvelAPI'

export default {
  components: { Timeline },
  name: 'IndexPage',
  async mounted() {
    this.movies = await marvelAPI.getMovies(null, 'title,cover_url')
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
