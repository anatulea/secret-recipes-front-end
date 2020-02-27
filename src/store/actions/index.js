import axiosWithAuth from '../../utils/axiosWithAuth'

export const POST_LOGIN_START = 'POST_LOGIN_START'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

export const postLogin = credentials => dispatch => {
  dispatch({ type: POST_LOGIN_START })

  axiosWithAuth()
    .post('login_endpoint_here', credentials)
    .then(res => {
      console.log(res)
      dispatch({ type: POST_LOGIN_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: POST_LOGIN_FAILURE, payload: err.data })
    })
}
