import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { editComment, deleteComment } from '../../actions/postActions';

const CommentItem = ({
  postId,
  comment,
  comment: { _id, text, name, avatar, user, date, edited },
  admin,
  auth,
  deleteComment,
  editComment
}) => {
  const [editVisible, setEditVisible] = useState(false);
  const [newText, setText] = useState(text);
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
        <>
          <form
            className='form my-1'
            onSubmit={e => {
              e.preventDefault();
              editComment(postId, _id, { ...comment, text: newText }, admin);
              setEditVisible(false);
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
            <input type='submit' className='btn btn-primary my-1' value='Submit' />
          </form>
          <button
            className='btn btn-dark my-1'
            value='Cancel'
            onClick={() => {
              setEditVisible(false);
              setText(text);
            }}
          >
            Cancel
          </button>
        </>
      }
      {!editVisible &&
        <div>
          <p className='my-3 bold'>{newText}</p>
          <div className="flex-block-text my-1">
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {edited.updated && (
              <p className="m-1">
                <small>
                  *Edited on {editedOn}
                </small>

              </p>
            )}
          </div>
          {!auth.loading && (user === auth.user._id || auth.user.admin) && (
            <>
              <button
                onClick={() => deleteComment(postId, _id, admin)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
              <button
                onClick={() => setEditVisible(true)}
                type='button'
                className='btn btn-primary'
              >
                Edit
              </button>
            </>
          )}
        </div>
      }
    </div>
  )
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.auth.user.admin
});

export default connect(
  mapStateToProps,
  { deleteComment, editComment }
)(CommentItem);