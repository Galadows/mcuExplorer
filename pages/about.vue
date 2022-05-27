<template>
  <div
    class="min-h-[100vh] min-w-[100vw] py-5 relative flex flex-col text-white justify-center items-center"
  >
    <div class="max-w-[60%] mb-10">
      <h1 class="font-extrabold">
        About <span class="text-marvel-red">me</span>
      </h1>
      <p>
        Hello, i'm a 24 year old french marvel fan, who just love to talk about
        the mcu, and what a better place to do it than on the web ?
      </p>
      <p>
        I'm a web developper, and enjoying all the joys (and pains) wich come
        with it!
      </p>
      <p>
        I'm always searching for new interesting projects and ideas, so don't
        hesitate to
        <a
          href="mailto:contact.mcuexplorer@gmail.com"
          class="text-marvel-red hover:not-italic font italic"
          >contact me!</a
        >
      </p>
    </div>
    <div class="max-w-[60%]">
      <h1 class="font-extrabold">
        About <span class="text-marvel-red">the</span> project
      </h1>
      <p>
        The purpose of this project is to ease the entry into the mcu by
        grouping all the necessary infos to understand it's current state and
        format them for quick access.
      </p>
      <p>
        I have a lot of ideas to improve the website, and i'll do my possible to
        update it as soon as i can with new infos and improvements!
      </p>
      <p>thanks to AugustoMarcelo for making <a href="https://github.com/AugustoMarcelo/mcuapi" class="text-marvel-red">mcuapi</a> which make the project so much less troublesome</p>
    </div>
    <div class="my-4 h-[18px]">

    </div>
    <NuxtLink
      to="/#timeline"
      class="font-extrabold italic mb-4 absolute left-1/2 right-1/2 bottom-0"
      ><fa icon="house" class="mr-1"
    /></NuxtLink>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
