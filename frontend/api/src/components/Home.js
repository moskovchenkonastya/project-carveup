import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Message, Blue } from './Styled'

const Home = ({ user , email }) =>
  user.token ? (
    <Message>
      {"You're logged in as "}
      <Blue>{ user.username }</Blue>
    </Message>
  ) : (
    <Redirect to="/map" />
  )

Home.propTypes = {
  user: PropTypes.shape({}).isRequired,
}

export default connect(state => ({ user: state.user, email:state.user.email }))(Home)
