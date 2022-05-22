export const state = () => ({
  movieToGet: 0
})

export const mutations = {
  setMovieToGet(state, movieId) {
    state.movieToGet = movieId
  }
}
