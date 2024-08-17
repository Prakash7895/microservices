import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RootContext } from './App';

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState({});
  // const { state, setState } = useContext(RootContext);

  // const fetchPosts = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   setComments(res.data);
  //   setState((p) => ({ ...p, fetchComment: '' }));
  // };

  // useEffect(() => {
  //   if (state.fetchComment === postId) {
  //     fetchPosts();
  //   }
  // }, [state.fetchComment]);

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <ul>
      {Object.values(comments).map((comment) => {
        let content;
        if (comment.status === 'approved') {
          content = comment.content;
        }
        if (comment.status === 'pending') {
          content = 'This comment is awaiting moderation.';
        }
        if (comment.status === 'rejected') {
          content = 'This comment has been rejected.';
        }
        return <li key={comment.id}>{content}</li>;
      })}
    </ul>
  );
};

export default CommentList;
