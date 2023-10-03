<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-screen bg-marvel-red overflow-hidden"
  >
<!--    <scrolling-banner-->
<!--      :images="movies"-->
<!--      @imageClicked="(id) => selectOnTimelineEmiter(id)"-->
<!--    />-->

    <div class="lg:block hidden w-[60%] mb-16" v-if="movie">
      <div
        class=" 2xl:m-0 mt-10 2xl:relative 2xl:top-0 overflow-hidden"
        v-if="movie.trailer_url"
      >
        <iframe
          v-if="movie.trailer_url.includes('youtu')"
          class="aspect-video w-full"
          :src="
                'https://www.youtube.com/embed/' +
                movie.trailer_url.substr(movie.trailer_url.lastIndexOf('/') + 1)
              "
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <iframe
          v-else
          class="aspect-video w-full"
          :src="movie.trailer_url.replace(/^http:\/\//i, 'https://')"
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div class="flex flex-2 flex-row">
      <a
        @mouseenter="buttonHover = true"
        @mouseleave="buttonHover = false"
        class="font-bold text-white md:w-[450px] text-center md:text-3xl text-xl md:p-5 w-[300px] p-2 m-2 border-2 cursor-pointer"
        href="#timeline"
      >
        {{ buttonHover ? 'Explore the MCU' : 'Welcome to MCU Explorer' }}
      </a>
    </div>
<!--    <scrolling-banner-->
<!--      :images="movies"-->
<!--      :invert="true"-->
<!--      @imageClicked="(id) => selectOnTimelineEmiter(id)"-->
<!--    />-->
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'
import ScrollingBanner from './subcomponents/ScrollingBanner.vue'

export default {
  components: { ScrollingBanner },
  name: 'Welcome',
  props: ['movies'],
  data() {
    return {
      buttonHover: false,
      upBannerHover: false,
      downBannerHover: false,
      isHovered: '',
      movie: null
    }
  },
  mounted() {
    console.log('Mounted')
  },
  methods: {
    selectOnTimelineEmiter(id) {
      this.$emit('selectOnTimeline', id)
      let element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ inline: 'center' })
      }
    },
    async getCurrentMovie() {
      let id = this.movies.find((movie) => new Date(movie.release_date) >= new Date()).id
      let response = await marvelAPI.getMovie(id)
      this.movie = response
      console.log(this.movie)
    }
  },
  watch: {
    movies() {
      this.getCurrentMovie()
    }
  }
}
</script>
