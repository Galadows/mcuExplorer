<template>
  <div
    id="timeline"
    ref="timeline"
    class="flex bg-black h-screen w-screen overflow-x-scroll overflow-y-hidden scrollbar-hidden scroll-smooth select-none"
  >
    <div class="flex flex-row justify-center items-center relative">
      <div
        class="md:w-screen/2 w-screen h-screen flex flex-col items-center justify-center mr-[7rem] relative"
      >
        <div class="mb-5">
          <h1 class="text-white mt-2 font-extrabold">MCU Timeline (WIP)</h1>
          <a
            class="text-marvel-red"
            :class="{
              'text-marvel-red cursor-pointer': !chronologicalOrder,
              'opacity-40': chronologicalOrder,
            }"
            @click="scrollTo('now')"
            >Click here to focus on now</a
          >
        </div>
        <input
          class="bg-transparent px-1 border-b border-white text-white outline-none"
          placeholder="Search"
          type="text"
          v-model="search"
        />
        <subcomponentsDropdown
          class="mt-2 w-48"
          dropdownName="Test"
          :options="[
            { label: 'All phases', value: 0 },
            { label: 'Phase 1', value: 1 },
            { label: 'Phase 2', value: 2 },
            { label: 'Phase 3', value: 3 },
            { label: 'Phase 4', value: 4 },
          ]"
          v-model="phase"
        />
        <subcomponentsToggle
          v-model="chronologicalOrder"
          falseOption="Release date"
          trueOption="Chronological order"
          class="my-2"
        />
        <subcomponentsToggle
          v-model="displayShows"
          tickable="true"
          label="Display tv shows"
          class="my-2"
        />
        <subcomponentsToggle
          v-model="displayMovies"
          tickable="true"
          label="Display movies"
          class="my-2"
        />
        <transition
          enter-active-class="duration-1000 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-1000 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <div
            v-if="scrollOffset == 0"
            class="absolute top-1/2 right-0 h-fit mr-10 text-white tall:hidden md:hidden animate-hover-right"
          >
            <fa icon="angle-right" class="" />
          </div>
        </transition>
        <div class="text-white flex text-xs absolute bottom-0 mb-1">
          <subcomponentsFooter />
        </div>
      </div>
      <template v-if="filteredMovies.length > 0">
        <div
          class="h-1 md:w-96 w-72 flex items-center"
          v-for="(movie, index) in filteredMovies"
          :key="movie.title + '-Timeline'"
          @mouseenter="movie.id == selected ? $emit('unselect') : null"
          :class="{
            'bg-marvel-red':
              moment(movie.release_date).isBefore(new Date()) ||
              chronologicalOrder,
            'bg-blue-900':
              (moment(movie.release_date).isAfter(new Date()) ||
                !movie.release_date) &&
              !chronologicalOrder,
          }"
        >
          <div
            class="h-4 w-4 border-2 bg-black relative hover:border-white rounded-full flex flex-col justify-center items-center"
            :class="{
              'border-marvel-red': moment(movie.release_date).isBefore(
                new Date()
              ),
              'border-blue-900':
                moment(movie.release_date).isAfter(new Date()) ||
                !movie.release_date,
            }"
          >
            <div
              :id="movie.id"
              class="flex flex-col tall:landscape:absolute landscape:static absolute justify-center items-center w-56 text-center"
              :class="{
                'md:top-[-25rem] -top-72': index % 2 == 0,
                'top-6': index % 2 != 0,
              }"
            >
              <NuxtLink
                :to="{
                  path:
                    movie.type == 'movie'
                      ? 'movie/' + movie.title.replaceAll(' ', '_')
                      : 'show/' + movie.title.replaceAll(' ', '_'),
                  query: { id: movie.id },
                }"
              >
                <img
                  :src="movie.cover_url"
                  :alt="movie.title + ' cover'"
                  class="md:h-64 h-40 m-5 border border-marvel-red"
                  :class="{
                    'border-marvel-red': moment(movie.release_date).isBefore(
                      new Date()
                    ),
                    'border-blue-900':
                      moment(movie.release_date).isAfter(new Date()) ||
                      !movie.release_date,
                    hidden: index % 2 != 0,
                  }"
              /></NuxtLink>
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
              <h3 class="flex text-white h-16 items-center">
                {{ movie.title }}
              </h3>
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
              <NuxtLink
                :to="{
                  path:
                    movie.type == 'movie'
                      ? 'movie/' + movie.title.replaceAll(' ', '_')
                      : 'show/' + movie.title.replaceAll(' ', '_'),
                  query: { id: movie.id },
                }"
              >
                <img
                  :src="movie.cover_url"
                  :alt="movie.title + ' cover'"
                  class="md:h-64 h-40 m-5 border border-marvel-red"
                  :class="{
                    'border-marvel-red': moment(movie.release_date).isBefore(
                      new Date()
                    ),
                    'border-blue-900':
                      moment(movie.release_date).isAfter(new Date()) ||
                      !movie.release_date,
                    hidden: index % 2 == 0,
                  }"
                />
              </NuxtLink>
            </div>
          </div>
          <template
            v-if="
              filteredMovies[index + 1] &&
              moment(movie.release_date).isBefore(new Date()) &&
              moment(filteredMovies[index + 1].release_date).isAfter(
                new Date()
              ) &&
              !chronologicalOrder
            "
          >
            <div
              class="relative md:right-[-10.8rem] right-[-8rem] md:w-[12.5rem] w-[9.5rem] h-1 bg-blue-900"
            ></div>
            <div
              id="now"
              class="h-2 w-2 border-2 left-[-1.8rem] relative bg-white rotate-45 text-white"
            >
              now
            </div>
          </template>
        </div>
        <div class="border-2 border-blue-900 h-4 w-4" style="" />
      </template>
      <div v-else class="md:w-96 w-72 flex items-center">
        <h1 class="text-white md:block hidden">
          Nothing to display, try to make the filters a bit less restricting
        </h1>
      </div>
      <div class="md:w-screen/2 w-screen h-screen"></div>
    </div>
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'
import moment from 'moment'

export default {
  name: 'Timeline',
  mounted() {
    let timeline = document.querySelector('#timeline')
    timeline.addEventListener(
      'scroll',
      (event) => {
        this.scrollOffset = timeline.scrollLeft
      },
      { passive: true }
    )
  },
  props: ['movies', 'selected'],

  data() {
    return {
      upBannerHover: false,
      downBannerHover: false,
      search: this.$store.state.store.currentParams.search,
      moment: moment,
      phase: this.$store.state.store.currentParams.phase,
      scrollOffset: 0,
      chronologicalOrder: this.$store.state.store.currentParams.chronologicalOrder,
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
      this.$store.commit('store/saveCurrentParams', params)
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
      this.saveParams(
        this.chronologicalOrder,
        this.displayMovies,
        this.displayShows,
        this.phase,
        this.search
      )
      this.$store.commit('store/setMovieAndShowList', newMovieList)
      return newMovieList
    },
  },
}
</script>
