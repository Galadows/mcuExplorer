import marvelAPI from '../api/marvelAPI'

export const state = () => ({
  movieList: [],
  movieAndShowList: [],
})

export const mutations = {
  setMovieList(state, movies) {
    state.movieList = movies
  },
  setMovieAndShowList(state, moviesAndShows) {
    state.movieAndShowList = moviesAndShows
  },
}

export const actions = {
  async getMovieList(context) {
    let data = []
    let response = await marvelAPI.getMovies(
      null,
      'release_date, ASC',
      'title,phase,release_date,cover_url,id,chronology'
    )
    response.forEach((movie) => {
      movie.type = 'movie'
      data.push(movie)
    })
    context.commit('setMovieList', data)
  },
}
