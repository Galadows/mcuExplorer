<template>
  <div class="m-0 p-0 max-w-screen overflow-hidden scrollbar-hidden">
    <Welcome @selectOnTimeline="id => selectOnTimeline(id)" :movies="covers" />
    <Timeline @unselect="selected = null" :movies="covers" :selected="selected" />
  </div>
</template>

<script>
import Timeline from '~/components/Timeline.vue'
import marvelAPI from '../api/marvelAPI'

export default {
  components: { Timeline },
  name: 'IndexPage',
  async mounted() {
    this.movies = await marvelAPI.getMovies(
      null,
      'title,release_date,cover_url,id'
    )
  },
  data() {
    return {
      movies: [],
      upBannerHover: false,
      downBannerHover: false,
      selected: null,
    }
  },
  methods: {
    selectOnTimeline(id) {
      this.selected = id;
    },
  },
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
