<template>
  <div
    class="flex flex-1 justify-center items-center animate-infinite-scroll"
    :class="{ pause: bannerHover }"
  >
    <a
      v-for="image in images"
      :key="image.title + 1"
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
      @click="$emit('imageClicked',image.id)"
      class="w-[172.77px] h-[256px] m-10 animate-fade-in"
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
        class="h-full md:w-full rounded-sm animate-unblur hover:animate-blur cursor-pointer"
      />
    </a>
    <a
      v-for="image in images"
      :key="image.title + 2"
      @click="$emit('imageClicked',image.id)"
      class="w-[172.77px] h-[256px] m-10 animate-fade-in"
    >
      <img
        @mouseenter="bannerHovered = true"
        @mouseleave="bannerHovered = false"
        :src="image.cover_url"
        :alt="image.title + ' cover'"
        class="h-full md:w-full rounded-sm animate-unblur hover:animate-blur cursor-pointer"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'ScrollingBanner',
  props: ['images'],
  data() {
    return {
      bannerHovered: false,
      isHovered: null,
    }
  },
}
</script>

<style></style>
