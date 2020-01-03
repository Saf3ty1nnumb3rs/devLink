import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Form from '../shared/Form';
import { editPost, addLike, removeLike, deletePost, getPosts } from '../../actions/postActions';
import { useEffect } from 'react';

const PostItem = ({
  addLike,
  removeLike,
  editPost,
  deletePost,
  admin,
  auth,
  post,
  post: { _id, text, name, avatar, user, likes, comments, date, edited },
  showActions
}) => {
  const [editVisible, setEditVisible] = useState(false);
  const [newText, setText] = useState('');
  const [adminUser, setAdmin] = useState(false);
  useEffect(() => {
    if (admin !== false) {
      setAdmin(admin)
    }

  }, [admin])
  useEffect(() => {
    setText(text)

    return () => {
      setText('');
    }
  }, [text])

  const editedOn = <Moment format='YYYY/MM/DD hh:mm a'>{edited.date}</Moment>;
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      {editVisible &&
        <div className="post-form">
          <Form
            className='form my-1'
            onSubmit={e => {
              e.preventDefault();
              editPost(_id, { ...post, text: newText }, adminUser);
              setEditVisible(false);
              getPosts();
            }}
          >
            <textarea
              name='text'
              cols='30'
              rows='5'
              placeholder='Create a post'
              value={newText}
              onChange={e => setText(e.target.value)}
              required
            />

          </Form>
          <button
            type='submit'
            className='btn btn-dark my-1'
            onClick={e => {
              e.preventDefault();
              editPost(_id, { ...post, text: newText }, adminUser);
              setEditVisible(false);
              getPosts();
            }}
            value='Submit'
          >
            Submit
          </button>
          <button
            className='btn btn-danger my-1'
            value='Cancel'
            onClick={() => {
              setEditVisible(false);
              setText(text);
            }}
          >
            Cancel
          </button>
        </div>
      }
      {!editVisible &&
        <div>
          <p className='my-3 bold'>{newText}</p>
          <div className="flex-block-text my-1">
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {edited.updated && (
              <p className='post-date m-1'>
                <small>
                  *Edited on {editedOn}
                </small>
              </p>
            )}
          </div>

          {showActions && (
            <Fragment>
              <button
                onClick={() => addLike(_id)}
                type='button'
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-up' />{' '}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>
              <button
                onClick={() => removeLike(_id)}
                type='button'
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-down' />
              </button>
              <Link to={`/posts/${_id}`} className='btn btn-primary'>
                Discussion{' '}
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && (user === auth.user._id || admin) && (
                <>
                  <button
                    onClick={() => setEditVisible(true)}
                    type='button'
                    className='btn btn-primary'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(_id, admin)}
                    type='button'
                    className='btn btn-danger'
                  >
                    <i className='fas fa-times' />
                  </button>
                </>
              )}
            </Fragment>
          )}
        </div>
      }
    </div>
  )
};

PostItem.defaultProps = {
  showActions: true,
  admin: false
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  admin: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.auth.user.admin
});

export default connect(
  mapStateToProps,
  { editPost, addLike, removeLike, deletePost, getPosts }
)(PostItem);