import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import { RootContext } from './App';

const PostList = () => {
  const [posts, setPosts] = useState({});
  const { state, setState } = useContext(RootContext);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');
    setPosts(res.data);
    setState((p) => ({ ...p, fetchPost: false }));
  };

  useEffect(() => {
    if (state.fetchPost) {
      fetchPosts();
    }
  }, [state]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className='card'
        style={{
          width: '30%',
          marginBottom: '20px',
        }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
          <hr />
          <CommentCreate postId={post.id} />
          <hr />
          <CommentList comments={post.comments} />
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
};

export default PostList;
