import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../shared/Input';
import Form from '../shared/Form';
import { addComment } from '../../actions/postActions';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3 className="m-1">Leave a Comment</h3>
      </div>
      <Form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <Input type='submit' className='btn btn-dark my-1' value='Submit' />
      </Form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
