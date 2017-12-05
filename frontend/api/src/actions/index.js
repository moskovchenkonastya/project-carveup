import { actionTypes as types, urls } from '../constants'
import { post, getAuth } from '../helpers'

export const signup = ({ name, surname, email, password }) => dispatch => {
  dispatch({ type: types.SIGNUP_REQUEST })
  post({
    url: urls.SIGNUP,
    body: { 'name': name, 'surname': surname, 'email':email, 'password': password },
    success: types.SIGNUP_SUCCESS,
    failure: types.SIGNUP_FAILURE,
    dispatch,
  })
}

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: types.LOGIN_REQUEST })
  post({
    url: urls.LOGIN,
    body: { 'email':email, 'password': password },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  })
}

export const loginWithToken = () => (dispatch, getState) => {
  const token = getState().user.token

  if (typeof token === 'undefined') return

  dispatch({ type: types.LOGIN_REQUEST })
  getAuth({
    url: urls.LOGIN_WITH_TOKEN,
    token: token,
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  })
}
