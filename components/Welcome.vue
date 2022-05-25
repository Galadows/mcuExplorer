<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-screen bg-marvel-red overflow-hidden min-h-[700px]"
  >
    <scrolling-banner
      :images="movies"
      @imageClicked="(id) => selectOnTimelineEmiter(id)"
    />
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
    <scrolling-banner
      :images="movies"
      :invert="true"
      @imageClicked="(id) => selectOnTimelineEmiter(id)"
    />
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
