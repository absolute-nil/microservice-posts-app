const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "CommentCreated":
      {
        let { id, content, postId, status } = data;
        status = data.content.includes('orange')? 'rejected': 'approved';
        await axios.post("http://localhost:4005/events", {
          type: 'CommentModerated',
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
});

app.listen(4003, () => {
  console.log("sever listening on port 4003");
});
