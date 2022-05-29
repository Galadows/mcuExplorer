<template>
  <div class="flex lg:flex-row flex-col md:h-screen w-screen bg-black">
    <div
      class="flex flex-col items-center lg:w-96 w-screen min-h-fit bg-marvel-red text-white"
    >
      <div
        class="flex lg:flex-col md:flex-row flex-col flex-1 text-center font-bold"
      >
        <img
          v-if="show.cover_url"
          :src="show.cover_url"
          :alt="show.title + ' cover'"
          class="tall:p-5 p-12 max-w-full"
        />
        <div
          v-else
          class="bg-black m-5 w-[14rem] h-[20rem] flex flex-1 justify-center"
        >
          No cover yet
        </div>
        <div
          v-if="show.trailer_url"
          class="flex text-left flex-col justify-center items-center"
        >
          <div class="w-fit">
            <h1 class="pl-5">Directed by: {{ show.directed_by }}</h1>
            <h1 class="pl-5">
              Release date:
              {{ moment(show.release_date).format('MMMM Do YYYY') }}
            </h1>
            <h1 class="pl-5">Number of season: {{ show.number_seasons }}</h1>
            <h1 class="pl-5">Number of episodes: {{ show.number_episodes }}</h1>
            <h1 class="pl-5">Saga: {{ show.saga || 'Not named yet' }}</h1>
            <h1 class="pl-5">Phase: {{ show.phase }}</h1>
          </div>
        </div>
        <div v-else>
          <h1>Not enough infos yet</h1>
        </div>
      </div>

      <div class="relative w-full h-10 p-2 m-5 mb-0 text-white">
        <NuxtLink
          v-if="previousMovie"
          class="font-extrabold italicml-2 mb-2 absolute left-[5%]"
          :to="{
            path: previousMovie.title.replaceAll(' ', '_'),
            query: { id: previousMovie.id },
          }"
          ><fa icon="arrow-left" class="mr-1" /> Previous show</NuxtLink
        >
        <NuxtLink
          to="/#timeline"
          class="font-extrabold italicml-2 mb-2 absolute left-1/2 right-1/2"
          ><fa icon="house" class="mr-1"
        /></NuxtLink>
        <NuxtLink
          v-if="nextMovie"
          class="font-extrabold italicml-2 mb-2 absolute right-[5%]"
          :to="{
            path: nextMovie.title.replaceAll(' ', '_'),
            query: { id: nextMovie.id },
          }"
          >Next show <fa icon="arrow-right" class="mr-1"
        /></NuxtLink>
      </div>
    </div>
    <div class="flex flex-1 flex-col p-10 relative text-white">
      <div class="flex 2xl:flex-row flex-col">
        <div class="h-fit">
          <h1 class="text-3xl mb-10 font-extrabold">{{ show.title }}</h1>
          <div class="lg:w-3/4" v-if="show.overview">
            <h2>Overview:</h2>
            <p>{{ show.overview }}</p>
          </div>
        </div>
        <div class="xl:w-fit xl:h-fit">
          <div
            class="lg:w-[560px] lg:h-[315px] 2xl:m-0 mt-10 w-full 2xl:relative 2xl:top-0"
            v-if="show.trailer_url"
          >
            <iframe
              v-if="show.trailer_url.includes('youtu')"
              class="aspect-video w-full"
              :src="
                'https://www.youtube.com/embed/' +
                show.trailer_url.substr(show.trailer_url.lastIndexOf('/') + 1)
              "
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <iframe
              v-else
              class="aspect-video w-full"
              :src="show.trailer_url.replace(/^http:\/\//i, 'https://')"
              title="Video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div></div>
      <div
        class="text-white justify-center w-[calc(100%-5rem)] flex text-xs absolute bottom-0 mb-1"
      >
        <subcomponentsFooter />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import marvelAPI from '~/api/marvelAPI'

export default {
  name: 'Details',
  async asyncData(context) {
    let title;
    if (context.params.details) {
      title = context.params.details.toString().split('_').join(' ')
    }
    const show = await marvelAPI.getShow(context.query.id, context.error)
    if (show && show.title != title) {
      context.redirect(
        '/show/' + show.title.split(' ').join('_') + '?id=' + show.id
      )
    }
    return { show }
  },
  mounted() {
    if (this.$store.state.store.movieList.length == 0) {
      this.$store.dispatch('store/getMovieList')
    }
    window.addEventListener('keyup', this.handleKeyUp)
  },
  data() {
    return {
      show: null,
      moment: moment,
    }
  },
  methods: {
    goToPrev() {
      this.$router.go(-1)
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    handleKeyUp(event) {
      if (event.key == 'ArrowRight' && this.nextMovie) {
        window.removeEventListener('keyup', this.handleKeyUp)
        this.$router.push({
          path: this.nextMovie.title.replaceAll(' ', '_'),
          query: { id: this.nextMovie.id },
        })
      }
      if (event.key == 'ArrowLeft' && this.previousMovie) {
        window.removeEventListener('keyup', this.handleKeyUp)
        this.$router.push({
          path: this.previousMovie.title.replaceAll(' ', '_'),
          query: { id: this.previousMovie.id },
        })
      }
    },
  },
  computed: {
    nextMovie() {
      return this.$store.state.store.movieList[
        this.$store.state.store.movieList.findIndex(
          (movie) => movie.id == this.show.id
        ) + 1
      ]
    },
    previousMovie() {
      return this.$store.state.store.movieList[
        this.$store.state.store.movieList.findIndex(
          (movie) => movie.id == this.show.id
        ) - 1
      ]
    },
  },
}
</script>

<style></style>
