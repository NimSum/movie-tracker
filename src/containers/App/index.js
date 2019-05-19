import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import { key } from '../../apiKey';
import Header from '../Header'
import Home from '../../components/Home';
import LoginPage from '../../components/LoginPage'
import { fetchAnything } from '../../utils/apiFetches/fetchAnything';
import { cleanMovies } from '../../utils/cleaners/cleanMovies'
import { addMovies } from '../../actions/index'
import MoviePage from '../../containers/MoviePage'

export class App extends Component {
  async componentDidMount() {
    // Use gist of copied data in place of api request with key
    const nowShowingUrl = 'https://gist.githubusercontent.com/NimSum/10413ecf56ebb80fd5cc1c82ba3392f5/raw/6fba221c12d065f673cc5b066621d0c4984edfa1/mock-movie-tracker-api';
    try {
      const movies = await fetchAnything(nowShowingUrl);
      const result = await cleanMovies(movies.results)
      await this.props.addMovies(result)
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path='/' component={ Home } />
        <Route exact path='/favorites' component={ Home } />
        <Route exact path='/login' component={ LoginPage } />
        <Route exact path='/movies/:id' component={ MoviePage } />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies
})

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
})

App.propTypes = {
  movies: PropTypes.array,
  addMovies: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
