const express = require("express");
const crypto = require("crypto");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {

const comments = commentByPostId[req.params.id] || [];
  res.status(200).send(comments);
});

app.post("/posts/:id/comments", (req, res) => {

  const id = crypto.randomBytes(4).toString("hex");
  const comments = commentByPostId[req.params.id] || [];
  const { content } = req.body;
  comments.push({
      id,
      content
  })
  commentByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("listening on port 4000");
});
