const axios = require('axios').default

class marvelAPI {
  static async getMovies(
    filter,
    order,
    properties = 'title,release_date,phase',
    page,
    limit
  ) {
    let params = {
      page: page,
      limit: limit,
      columns: properties,
      order: order || 'chronology,ASC',
      filter: filter,
    }

    let data

    await axios
      .get('https://mcuapi.herokuapp.com/api/v1/movies', {
        params,
      })
      .then(function (response) {
        // handle success
        return (data = response.data.data)
      })
      .catch(function (error) {
        return error
      }) // handle error
      .then(function () {
        // always executed
      })

    return data
  }

  static async getMovie(id, errorCallback) {
    let data
    await axios
      .get('https://mcuapi.herokuapp.com/api/v1/movies/' + id)
      .then(function (response) {
        // handle success
        console.log(response.data)
        return (data = response.data)
      })
      .catch(function (error) {
        // handle error
        errorCallback(error)
      })
    return data
  }

  static async getShows(
    filter,
    properties = 'title,release_date,phase',
    page,
    limit
  ) {
    let params = {
      page: page,
      limit: limit,
      columns: properties,
      filter: filter,
    }

    let data

    await axios
      .get('https://mcuapi.herokuapp.com/api/v1/tvshows', {
        params,
      })
      .then(function (response) {
        // handle success
        return (data = response.data.data)
      })
      .catch(function (error) {
        return error
      }) // handle error
      .then(function () {
        // always executed
      })

    return data
  }

  static async getShow(id, errorCallback) {
    let data
    await axios
      .get('https://mcuapi.herokuapp.com/api/v1/tvshows/' + id)
      .then(function (response) {
        // handle success
        console.log('Show Response');
        return (data = response.data)
      })
      .catch(function (error) {
        // handle error
        console.log('Show Error');
        errorCallback(error)
      })
    return data
  }
}

export default marvelAPI
