import axios from 'axios';

export const setFavorite = payload => ({
  type: 'SET_FAVORITE',
  payload,
});

export const deleteFavorite = payload => ({
  type: 'DELETE_FAVORITE',
  payload,
});

export const loginRequest = payload => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = payload => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const setError = payload => ({
  type: 'SET-ERROR',
  payload,
});

export const registerRequest = payload => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const getVideoSource = payload => ({
  type: 'GET_VIDEO_SOURCE',
  payload,
});

export const registerUser = (user, redirectUrl) => async (dispatch) => {
  const response = await axios.post('http://localhost:3000/api/auth/sign-up', user);
  if (response.data.message === 'user already exists') {
    alert('El usuario ya existe');
    window.location.href = '/register';
  } else {
    const newUser = response.data;
    console.log(newUser);
    dispatch({
      type: 'REGISTER_REQUEST',
      payload: newUser,
    });
    window.location.href = redirectUrl;
  }
};
