<template>
  <div
    id="timeline"
    ref="timeline"
    class="flex bg-black h-screen w-screen overflow-x-scroll overflow-y-hidden scrollbar-hidden scroll-smooth min-h-[700px]"
  >
    <div class="flex flex-row justify-center items-center">
      <div
        class="md:w-screen/2 w-screen h-screen flex flex-1 flex-col items-center"
      >
        <div class="mb-5">
          <h1 class="text-white mt-20 font-extrabold">MCU Timeline (WIP)</h1>
          <a class="text-marvel-red cursor-pointer" @click="scrollTo('now')"
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
      </div>
      <template v-if="filteredMovies">
        <div
          class="h-1 md:w-96 w-72 flex items-center"
          v-for="(movie, index) in filteredMovies"
          :key="movie.title + '-Timeline'"
          @mouseenter="movie.id == selected ? $emit('unselect') : null"
          :class="{
            'bg-marvel-red': moment(movie.release_date).isBefore(new Date()),
            'bg-blue-900':
              moment(movie.release_date).isAfter(new Date()) ||
              !movie.release_date,
          }"
        >
          <div
            class="h-4 w-4 border-2 relative right-3 bg-black hover:border-white rounded-full"
            :class="{
              'border-marvel-red': moment(movie.release_date).isBefore(
                new Date()
              ),
              'border-blue-900':
                moment(movie.release_date).isAfter(new Date()) ||
                !movie.release_date,
            }"
          >
            <!-- <div
            class="h-4 w-4 border-2 relative top-[-2px] right-[2px] bg-black border-marvel-red hover:border-white rounded-full"
            :class="{
              'animate-ping border-white': selected == movie.id,
              hidden: selected != movie.id,
            }"
          /> -->
            <div
              :id="movie.id"
              class="flex flex-col relative right-28 justify-center items-center w-56 text-center"
              :class="{
                'md:top-[-25rem] -top-72': index % 2 == 0,
                'top-6': index % 2 != 0,
              }"
            >
              <NuxtLink
                :to="{
                  path: 'film/' + movie.title.replaceAll(' ', '_'),
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
                  path: 'film/' + movie.title.replaceAll(' ', '_'),
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
              moment(filteredMovies[index + 1].release_date).isAfter(new Date())
            "
          >
            <div
              class="relative md:right-[-10.5rem] right-[-7.5rem] md:w-[12rem] w-[9rem] h-1 bg-blue-900"
            ></div>
            <div
              id="now"
              class="h-2 w-2 border-2 left-[-1.8rem] relative bg-white rotate-45 text-white"
            >
              now
            </div>
          </template>
        </div>
      </template>
      <div class="border-2 border-blue-900 h-4 w-4" style="" />
      <div class="w-screen/2 h-screen"></div>
    </div>
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'
import moment from 'moment'

export default {
  name: 'Timeline',
  async mounted() {
    let that = this
    document.onreadystatechange = () => {
      if (document.readyState == 'complete') {
        that.scrollTo(that.$route.query.id)
      }
    }
  },
  props: ['movies', 'selected'],

  data() {
    return {
      upBannerHover: false,
      downBannerHover: false,
      search: '',
      moment: moment,
      phase: 0,
    }
  },
  methods: {
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
    }
  },
  computed: {
    filteredMovies() {
      let newMovieList = this.phaseFilter(this.searchFilter(this.movies))
      return newMovieList
    },
  },
}
</script>
