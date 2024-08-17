import React, { useContext, useState } from 'react';
import axios from 'axios';
import { RootContext } from './App';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const { setState } = useContext(RootContext);

  const onSumbit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title,
    });

    setTitle('');
    setState((p) => ({ ...p, fetchPost: true }));
  };

  return (
    <div>
      <form onSubmit={onSumbit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
