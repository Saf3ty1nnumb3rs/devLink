import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  EDIT_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT
} from './types';
import {
  getPostById, getAllPosts
} from '../api/postApi';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await getAllPosts();

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editPost = (postId, formData, admin = false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'admin': admin
    }
  };
  try {
    const res = await axios.put(`/api/posts/${postId}`, formData, config);
    dispatch({
      type: EDIT_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Edited', 'success'));
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
// Delete post
export const deletePost = (id, admin = false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'admin': admin
    }
  };
  try {
    await axios.delete(`/api/posts/${id}`, config);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await getPostById(id);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/${postId}/comment/`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editComment = (postId, commentId, formData, admin = false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'admin': admin
    }
  };
  try {
    const res = await axios.put(`/api/posts/${postId}/comment/${commentId}`, formData, config);
    dispatch({
      type: EDIT_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Edited', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
// Delete comment
export const deleteComment = (postId, commentId, admin = false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'admin': admin
    }
  };
  try {
    await axios.delete(`/api/posts/${postId}/comment/${commentId}`, config);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};