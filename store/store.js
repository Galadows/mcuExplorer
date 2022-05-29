import marvelAPI from '../api/marvelAPI'

export const state = () => ({
  movieList: [],
  movieAndShowList: [],
  currentParams: {
    chronologicalOrder: false,
    displayMovies: true,
    displayShows: true,
    phase: 0,
    search: "",
  }
})

export const mutations = {
  setMovieList(state, movies) {
    state.movieList = movies
  },
  setMovieAndShowList(state, moviesAndShows) {
    state.movieAndShowList = moviesAndShows
  },
  saveCurrentParams(state, params) {
    state.currentParams = params
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
  async getMovieAndShowList(context) {
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

    let response2 = await marvelAPI.getShows(
      null,
      'title,phase,release_date,cover_url,id'
    )
    response2.forEach((show) => {
      show.type = 'show'
      data.push(show)
    })
    context.commit('setMovieAndShowList', data)
  },
}
