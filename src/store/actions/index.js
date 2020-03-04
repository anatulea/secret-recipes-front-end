import { axiosWithAuth } from '../../utils/axiosWithAuth'

export const POST_LOGIN_START = 'POST_LOGIN_START'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

export const POST_REGISTER_START = 'POST_REGISTER_START'
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS'
export const POST_REGISTER_FAILURE = 'POST_REGISTER_FAILURE'

export const POST_ADDRECIPE_START = 'POST_ADDRECIPE_START'
export const POST_ADDRECIPE_SUCCESS = 'POST_ADDRECIPE_SUCCESS'
export const POST_ADDRECIPE_FAILURE = 'POST_ADDRECIPE_FAILURE'

// export const FETCH_DATA_START = 'FETCH_DATA_START'
// export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
// export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

// export const PUT_EDIT_START = 'PUT_EDIT_START'
// export const PUT_EDIT_SUCCESS = 'PUT_EDIT_SUCCESS'
// export const PUT_EDIT_FAILURE = 'PUT_EDIT_FAILURE'

export const postLogin = credentials  => dispatch => {
  dispatch({ type: POST_LOGIN_START })

  axiosWithAuth()
    .post('/auth/login', credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.id)
      dispatch({ type: POST_LOGIN_SUCCESS, payload: res.data.id })
    })
    .catch(err => {
      console.log(err)
      localStorage.removeItem('token')
      dispatch({ type: POST_LOGIN_FAILURE, payload: err.data })
    })
}

export const postRegister = credentials => dispatch => {
  dispatch({ type: POST_REGISTER_START })

  axiosWithAuth()
    .post('/auth/register', credentials)
    .then(res => {
      console.log(res)
      dispatch({ type: POST_REGISTER_SUCCESS })
      postLogin(credentials)
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: POST_REGISTER_FAILURE, payload: err.data })
    })
}

export const postAddRecipe = credentials => dispatch => {
  dispatch({
    type: POST_ADDRECIPE_START,
    payload: credentials,
  })
  console.log('credentials in post add', credentials)
  axiosWithAuth()
    .post('/recipes', credentials)
    .then(res => {
      console.log('postAddRecipe response', res)
      dispatch({
        type: POST_ADDRECIPE_SUCCESS,
        payload: res.data.created_recipe,
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: POST_ADDRECIPE_FAILURE,
        payload: 'error postind data',
      })
    })
}

// export const putEditRecipe = credentials => dispatch => {
//   dispatch ({
//     type:PUT_EDIT_START,
//     payload:credentials
//   });
//   axiosWithAuth()
//   .put(`/recipes/${credentials.id}` )
//   .then(res => {
//     console.log("Response in the PUT request", res)
//     dispatch({
//       type:PUT_EDIT_SUCCESS,
//       payload: res.data.created_recipe
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     dispatch({
//       type:PUT_EDIT_FAILURE,
//       payload:"error put data"
//     });
//   });
// };



// export const getData = credentials => dispatch => {
//   dispatch({
//       type: FETCH_DATA_START,
//       payload: credentials
//   });
//   axiosWithAuth()
//       .get(`/recipes/allRecipes`, credentials)
//       .then(res => {
//           console.log( res);
//           dispatch({
//               type: FETCH_DATA_SUCCESS,
//               payload: res.data.created_recipe
//           });
//       })
//       .catch(err => {
//           console.error(err);
//           dispatch({
//               type: FETCH_DATA_FAILURE,
//               payload: " error fetching data from the api"
//           });
//       });
// };
