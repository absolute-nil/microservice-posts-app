const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const eventHandler = async (type,data) => {
  switch (type) {
    case "CommentCreated":
      {
        let { id, content, postId, status } = data;
        status = data.content.includes('orange')? 'rejected': 'approved';
        await axios.post("http://event-bus-srv:4005/events", {
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
}

app.get("/posts", (req, res) => {
  res.send(posts);
});



app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  eventHandler(type,data)
  res.send({});
});

app.listen(4003, async () => {
  console.log("sever listening on port 4003");

  const res = await axios.get("http://event-bus-srv:4005/events");

  res.data.forEach(event => {
    console.log("Processing event " + event.type);

    eventHandler(event.type,event.data)
  });

});
