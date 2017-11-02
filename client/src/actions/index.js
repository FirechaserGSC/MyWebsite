import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');
  dispatch({ type: FETCH_BLOGS, payload: res.data });
};
