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
        console.log(response)
        return (data = response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })

    return data
  }

  static async getMovie(id) {
    let data
    await axios
      .get('https://mcuapi.herokuapp.com/api/v1/movies/' + id)
      .then(function (response) {
        // handle success
        console.log(response)
        return (data = response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })

    return data
  }
}

export default marvelAPI
