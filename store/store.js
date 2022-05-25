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
    console.log("Context: ", context);
    let response = await marvelAPI.getMovies(
      null,
      'release_date, ASC',
      'title,release_date,cover_url,id,chronology'
    )
    console.log("Response: ", response);
    context.commit('setMovieList', response)
  },
}
