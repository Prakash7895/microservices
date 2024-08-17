const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  const comment = { id: commentId, content, status: 'pending' };

  comments.push(comment);
  console.log('commentsByPostId2222', commentsByPostId);

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { ...comment, postId: req.params.id },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('REceivedEVETM', req.body);
  console.log('commentsByPostId', commentsByPostId);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const comments = commentsByPostId[data.postId];
    console.log('comments', comments);

    const comment = comments.find((c) => c.id === data.id);

    comment.status = data.status;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: { ...comment, postId: data.postId },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
