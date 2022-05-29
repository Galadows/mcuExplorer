<template>
  <div
    class="h-screen w-screen relative bg-black text-white flex justify-center items-center"
  >
    <div>
      <h1 class="text-xl font-bold">
        Sorry, this page has been
        <span class="text-yellow-400 font-extrabold">snapped</span>
      </h1>
      <NuxtLink to="/">It's dangerous out there, come back to safety</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error',
}
</script>
