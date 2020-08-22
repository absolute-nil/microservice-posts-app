const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors())

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {

const comments = commentByPostId[req.params.id] || [];
  res.status(200).send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {

  const id = crypto.randomBytes(4).toString("hex");
  const comments = commentByPostId[req.params.id] || [];
  const { content } = req.body;
  comments.push({
      id,
      content,
      status: 'pending'
  })
  commentByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: 'CommentCreated',
    data: {
      id,
      content,
      status: 'pending',
      postId : req.params.id
    }
  })
  res.status(201).send(comments);
});

app.post("/events", async (req,res) => {
  console.log("Event Received",req.body.type);
  const { type, data } = req.body;

  switch (type) {
    case "CommentModerated":
      {
        const { id, postId, status,content } = data;

        const comments = commentByPostId[postId];
        const comment = comments.find((comment)=> comment.id === id);
        comment.status = status;

        await axios.post("http://localhost:4005/events", {
          type: 'CommentUpdated',
          data: {
            id,
            content,
            status,
            postId
          }
        })
      }
      break;

    default:
      break;
  }

  res.send({});
})

app.listen(4001, () => {
  console.log("listening on port 4001");
});
