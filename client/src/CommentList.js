import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(response.data);
    console.log(response);
  };

  useEffect(() =>{
      fetchData()
  },[]
  )

  const renderedComments = comments.map((comment) => {
    return (
      <div className="item" key={comment.id}>
        {comment.content}
      </div>
    );
  });

  return (
    <>
      <h3>{comments.length} comments</h3>
      <div className="ui bulleted list">{renderedComments}</div>
    </>
  );
};

export default CommentList;
