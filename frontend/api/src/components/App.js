import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import Async from 'react-code-splitting'

import Login from './Auth/Login'
import Signup from './Auth/Signup'
import SelectCity from './Map/SelectCity'
import ListCars  from './Car/ListCars'
import Header from './Header'
import { Body } from './Styled'

const Home = () => <Async load={import('./Home')} />

const App = ({ user }) => (
  <Body>
    
    <Switch>
      {user.token && <Route path="/" component={ Home } />}
      <Route path="/signup" component={ Signup } />
      <Route path="/login" component={ Login } />
      <Route path="/map" component={ SelectCity } />
    </Switch>
  </Body>
)
//<Redirect to="/login" />

App.propTypes = {
  user: PropTypes.shape({}).isRequired,
}

export default withRouter(connect(state => ({ user: state.user }))(App))
