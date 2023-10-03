<template>
  <div
    class="h-screen w-screen flex flex-row overflow-x-scroll scrollbar-hidden"
  >
    <div class="md:min-w-[calc(100vw/2)] h-screen bg-white"></div>
    <timeline-builder
      id="timeline"
      v-if="movies"
      :content="filteredMovies"
    ></timeline-builder>
    <div class="md:min-w-[calc(100vw/2)] h-screen bg-white"></div>
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'
import moment from 'moment'
import TimelineBuilder from '~/components/subcomponents/TimelineBuilder.vue'

export default {
  components: { TimelineBuilder },
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
      'title,phase,release_date,cover_url,id'
    )

    this.shows = response2

    let timeline = document.querySelector('#timeline')
    timeline.addEventListener(
      'scroll',
      (event) => {
        this.scrollOffset = timeline.scrollLeft
      },
      { passive: true }
    )
  },
  props: {
    content: {
      type: Array,
    },
  },

  data() {
    return {
      movies: [],
      shows: [],
      upBannerHover: false,
      downBannerHover: false,
      search: this.$store.state.store.currentParams.search,
      moment: moment,
      phase: this.$store.state.store.currentParams.phase,
      scrollOffset: 0,
      chronologicalOrder:
        this.$store.state.store.currentParams.chronologicalOrder,
      displayMovies: this.$store.state.store.currentParams.displayMovies,
      displayShows: this.$store.state.store.currentParams.displayShows,
    }
  },
  methods: {
    saveParams(chronologicalOrder, displayMovies, displayShows, phase, search) {
      let params = {
        chronologicalOrder: chronologicalOrder,
        displayMovies: displayMovies,
        displayShows: displayShows,
        phase: phase,
        search: search,
      }
      // this.$store.commit('store/saveCurrentParams', params)
    },
    unselect() {
      this.$event('unselect')
    },
    scrollTo(id) {
      document.getElementById(id)?.scrollIntoView({ inline: 'center' })
    },
    phaseFilter(movies) {
      if (this.phase == 0) return movies
      return movies.filter((movie) => movie.phase == this.phase)
    },
    searchFilter() {
      if (!this.search) return this.movies
      return this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    sortByChronology(a, b) {
      if (a.chronology === null) {
        return 1
      }
      if (b.chronology === null) {
        return -1
      }
      if (a.chronology < b.chronology) {
        return -1
      }
      if (a.chronology > b.chronology) {
        return 1
      }
      return 0
    },
    sortByReleaseDate(a, b) {
      if (a.release_date === null) {
        return 1
      }
      if (b.release_date === null) {
        return -1
      }
      if (moment(a.release_date).isBefore(b.release_date)) {
        return -1
      }
      if (moment(a.release_date).isAfter(b.release_date)) {
        return 1
      }
      return 0
    },
    filterTypes(movies) {
      return movies.filter(
        (movie) =>
          (movie.type == 'movie' && this.displayMovies) ||
          (movie.type == 'show' && this.displayShows)
      )
    },
  },
  computed: {
    filteredMovies() {
      if (this.chronologicalOrder) this.movies.sort(this.sortByChronology)
      else this.movies.sort(this.sortByReleaseDate)
      let newMovieList = this.filterTypes(
        this.phaseFilter(this.searchFilter(this.movies))
      )
      // this.saveParams(
      //   this.chronologicalOrder,
      //   this.displayMovies,
      //   this.displayShows,
      //   this.phase,
      //   this.search
      // )
      // this.$store.commit('store/setMovieAndShowList', newMovieList)
      return newMovieList
    },
  },
}
</script>
