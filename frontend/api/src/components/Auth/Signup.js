import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { signup } from '../../actions'

import { FormTitle, FooterLink } from '../Styled'
import FormSingup from './FormSingup'
import Header from '../Header'

const Signup = ({ user, signup }) => {
  const handleSubmit = e => {
    e.preventDefault()
    const { 
      name: { value: name },
      surname: { value: surname },
      email: { value: email }, 
      password: { value: password },
    } = e.target
    signup({ name, surname, email, password })
  }

  return (
    <div>
      <Header />
      <FormTitle>Sign up</FormTitle>
      <FormSingup onSubmit={ handleSubmit } />
      <FooterLink to="/login">Already have an account ?</FooterLink>
      { user.username && <Redirect to="/login" />}
    </div>
  )
}

Signup.propTypes = {
  user: PropTypes.shape({}).isRequired,
  signup: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps, { signup })(Signup)
