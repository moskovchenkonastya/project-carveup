import React from 'react'
import PropTypes from 'prop-types'

import { TextField, Submit } from '../Styled'

const FormSingup = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <TextField
      type="text"
      name="name"
      placeholder="Nickname"
      title="Enter your nickname"
      required
    />
    <TextField
      type="text"
      name="surname"
      placeholder="Surname"
      title="Enter your Surname"
      required
    />
    <TextField
      type="email"
      name="email"
      placeholder="Email address"
      title="Enter your email address"
      required
    />        
    <TextField
      type="password"
      name="password"
      placeholder="Password"
      //title="Type a strong password: aBC_123^"
      //pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
      required
    />
    <Submit type="submit" value="Continue" />
  </form>
)

FormSingup.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default FormSingup
