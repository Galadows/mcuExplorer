<template>
  <div class="h-screen w-screen bg-black">
    <div class="flex flex-col items-center h-screen md:w-96 bg-marvel-red">
      <div class="flex-1">
        <img
          :src="movie.cover_url"
          :alt="movie.title + ' cover'"
          class="p-5 border border-marvel-red"
        />
      </div>
      <NuxtLink :to="'/#' + movie.id" class="text-white font-semibold italic self-start ml-2 mb-2">Go Back</NuxtLink>
    </div>
  </div>
</template>

<script>
import marvelAPI from '../../api/marvelAPI'

export default {
  name: 'Details',
  async asyncData({ params, query }) {
    console.log(params)
    const movie = await marvelAPI.getMovie(query.id)
    return { movie }
  },

  data() {
    return {
      movie: null,
    }
  },
}
</script>

<style></style>
