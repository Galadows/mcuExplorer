<template>
  <div class="m-0 p-0 max-w-screen overflow-hidden scrollbar-hidden">
    <Welcome
      @selectOnTimeline="(id) => selectOnTimeline(id)"
      :movies="covers"
    />
    <Timeline
      @unselect="selected = null"
      :movies="covers"
      :selected="selected"
    />
  </div>
</template>

<script>
import Timeline from '~/components/Timeline.vue'
import marvelAPI from '../api/marvelAPI'

export default {
  components: { Timeline },
  name: 'IndexPage',
  async mounted() {
    if (this.$store.state.store.movieList.length == 0) {
      let response = await marvelAPI.getMovies(
        null,
        'release_date, ASC',
        'title,phase,release_date,cover_url,id,chronology'
      )
      this.movies = response
      // response.forEach((movie) => {
      //   movie.type = 'movie'
      //   this.movies.push(movie)
      // })
      this.$store.commit('store/setMovieList', this.movies)
    } else {
      this.movies = this.$store.state.store.movieList
    }

    let response2 = await marvelAPI.getShows(
      null,
      'title,phase,release_date,cover_url,id, season'
    )

    this.shows = response2
    // response2.forEach((show) => {
    //   show.type = 'show'
    //   this.shows.push(show)
    // })
  },
  data() {
    return {
      movies: [],
      shows: [],
      upBannerHover: false,
      downBannerHover: false,
      selected: null,
    }
  },
  methods: {
    selectOnTimeline(id) {
      this.selected = id
    },
  },
  computed: {
    covers() {
      if (!this.movies) return
      let withCovers = []
      this.moviesAndShows.forEach((thing) => {
        if (thing.cover_url) {
          withCovers.push(thing)
        }
      })
      return withCovers
    },
    moviesAndShows(){
      return [...this.movies,...this.shows]
    }
  },
}
</script>
