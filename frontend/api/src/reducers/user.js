import { actionTypes as types } from '../constants'

const user = (state = {}, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:

      if (typeof action.json.token !== 'undefined') {
        state.token = action.json.token
      }
      if (typeof action.json.username !== 'undefined') {
        state.username = action.json.username
      }
      return state
    case types.LOGIN_FAILURE:
      return {}
    default:
      return state
  }
}

export default user



// WEBPACK FOOTER //
// ./reducers/user.js