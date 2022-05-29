<template>
  <div
    class="flex flex-1 justify-center items-center select-none"
    :class="{
      pause: bannerHovered,
      'animate-infinite-scroll': !invert,
      'animate-infinite-scroll-inverted': invert,
    }"
  >
    <template v-for="dupe in 2">
      <a
        v-for="image in images"
        :key="image.title + dupe"
        @mouseenter="
          () => {
            bannerHovered = true
            isHovered = image.id
          }
        "
        @mouseleave="
          () => {
            bannerHovered = false
            isHovered = null
          }
        "
        @click="$emit('imageClicked', image.type + '-' + image.id)"
        class="w-[172.77px] h-[256px] mx-10 animate-fade-in"
      >
        <h1
          class="absolute w-[172.77px] h-[256px] text flex justify-center items-center text-center z-10 text-white font-bold pointer-events-none px-2"
          :class="{
            'animate-fade-in-fast': isHovered == image.id,
            hidden: isHovered != image.id,
          }"
        >
          {{ image.title }}
        </h1>
        <img
          :src="image.cover_url"
          :alt="image.title + ' cover'"
          class="h-full border border-white md:w-full rounded-sm animate-unblur hover:animate-blur cursor-pointer"
        />
      </a>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ScrollingBanner',
  props: ['images', 'invert'],
  data() {
    return {
      bannerHovered: false,
      isHovered: null,
    }
  },
}
</script>

<style></style>
