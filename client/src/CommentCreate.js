import React, { useContext, useState } from 'react';
import axios from 'axios';
import { RootContext } from './App';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');
  const { setState } = useContext(RootContext);

  const onSumbit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent('');
    setState((p) => ({ ...p, fetchPost: true }));
  };

  return (
    <div>
      <form onSubmit={onSumbit}>
        <div className='form-group'>
          <label>Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='form-control'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
