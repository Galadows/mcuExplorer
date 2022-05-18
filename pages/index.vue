<template>
  <div class="m-0 p-0 max-w-screen overflow-hidden scrollbar-hidden">
    <Welcome />
    <Timeline />
  </div>
</template>

<script>
import Timeline from '~/components/Timeline.vue'
export default {
  components: { Timeline },
  name: 'IndexPage',
}
</script>
