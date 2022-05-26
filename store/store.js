import marvelAPI from '../api/marvelAPI'

export const state = () => ({
  movieList: [],
})

export const mutations = {
  setMovieList(state, movies) {
    state.movieList = movies
  },
}

export const actions = {
  async getMovieList(context) {
    let response = await marvelAPI.getMovies(
      null,
      'release_date, ASC',
      'title,phase,release_date,cover_url,id,chronology'
    )
    context.commit('setMovieList', response)
  },
}
