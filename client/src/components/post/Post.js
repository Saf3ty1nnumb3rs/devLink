import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CircleLoader from '../shared/CircleLoader';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/postActions';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <CircleLoader />
  ) : (
      <Fragment>
        <div className="flex-block">
          <div className="flex-block-text">
            <Link to='/posts'>
              <i className='fas fa-arrow-alt-circle-left fa-2x' />
            </Link>
            <p className="m-1">Back To Posts</p>
          </div>
          <div />
        </div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className='comments'>
          {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </Fragment>
    );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);