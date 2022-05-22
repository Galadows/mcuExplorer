<template>
  <div
    class="flex border-white border-4 flex-col justify-center items-center h-screen w-screen bg-marvel-red overflow-hidden"
  >
    <div
      class="flex flex-1 justify-center items-center animate-infinite-scroll"
      :class="{ pause: upBannerHover }"
    >
      <a
        v-for="movie in movies"
        :key="movie.title + 1"
        @mouseenter="
          () => {
            upBannerHover = true
            isHovered = 'upBanner-' + movie.id
          }
        "
        @mouseleave="
          () => {
            upBannerHover = false
            isHovered = ''
          }
        "
        @click="selectOnTimelineEmiter(movie.id)"
        class="w-[172.77px] h-[256px] m-10 animate-fade-in"
      >
        <h1
          class="absolute w-[172.77px] h-[256px] text flex justify-center items-center text-center z-10 text-white font-bold pointer-events-none px-2"
          :class="{
            'animate-fade-in-fast': isHovered == 'upBanner-' + movie.id,
            hidden: isHovered != 'upBanner-' + movie.id,
          }"
        >
          {{ movie.title }}
        </h1>
        <img
          :src="movie.cover_url"
          :alt="movie.title + ' cover'"
          class="h-full md:w-full rounded-sm animate-unblur hover:animate-blur cursor-pointer"
        />
      </a>
      <a
        v-for="movie in movies"
        :key="movie.title + 2"
        @click="selectOnTimelineEmiter(movie.id)"
        class="w-[172.77px] h-[256px] m-10 animate-fade-in"
      >
        <img
          @mouseenter="upBannerHover = true"
          @mouseleave="upBannerHover = false"
          :src="movie.cover_url"
          :alt="movie.title + ' cover'"
          class="h-full md:w-full rounded-sm animate-unblur hover:animate-blur cursor-pointer"
        />
      </a>
    </div>

    <div class="flex flex-2 flex-row">
      <a
        @mouseenter="buttonHover = true"
        @mouseleave="buttonHover = false"
        class="font-bold text-white md:w-[450px] text-center md:text-3xl text-xl md:p-5 p-2 m-2 border-2 cursor-pointer"
        href="#timeline"
      >
        {{ buttonHover ? 'Explore the MCU' : 'Welcome to MCU Explorer' }}
      </a>
    </div>
    <div
      class="flex flex-1 justify-center items-center animate-infinite-scroll-inverted"
      :class="{ pause: downBannerHover }"
    >
      <a
        v-for="movie in movies"
        :key="movie.title + 3"
        @click="selectOnTimelineEmiter(movie.id)"
        class="w-[172.77px] h-[256px] m-10 animate-fade-in"
      >
        <img
          @mouseenter="downBannerHover = true"
          @mouseleave="downBannerHover = false"
          :src="movie.cover_url"
          :alt="movie.title + ' cover'"
          class="h-full md:w-full rounded-sm animate-unblur hover:animate-blur cursor-pointer"
        />
      </a>
      <a
        v-for="movie in movies"
        :key="movie.title + 4"
        @click="selectOnTimelineEmiter(movie.id)"
        class="w-[172.77px] h-[256px] m-10 animate-fade-in"
      >
        <img
          @mouseenter="downBannerHover = true"
          @mouseleave="downBannerHover = false"
          :src="movie.cover_url"
          :alt="movie.title + ' cover'"
          class="h-full md:w-full rounded-sm animate-unblur hover:animate-blur cursor-pointer"
        />
      </a>
    </div>
    <!-- <img v-for="movie in movies" :key="movie.title" :src="movie.cover_url" :alt="movie.title + ' cover'" class="h-20"> -->
  </div>
</template>

<script>
import marvelAPI from '../api/marvelAPI'

export default {
  name: 'Welcome',
  async mounted() {},
  props: ['movies'],
  data() {
    return {
      buttonHover: false,
      upBannerHover: false,
      downBannerHover: false,
      isHovered: '',
    }
  },
  methods: {
    selectOnTimelineEmiter(id) {
      this.$emit('selectOnTimeline', id)
      document.getElementById(id).scrollIntoView({ inline: 'center' })
    },
  },
  computed: {},
}
</script>
