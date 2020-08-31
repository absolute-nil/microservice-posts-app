import React, { useState, useEffect } from "react";
import axios from "axios";

import CommentCreate from "./CommentCreate";
import CommentList from './CommentList'

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const response = await axios.get("http://posts.com/posts");
    setPosts(response.data);
    console.log(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="ui card column"
        style={{
          width: "30%",
          margin: "0px 10px 20px 5px",
          backgroundColor: "lavender",
        }}
        key={post.id}
      >
        <div className="content">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="ui equal width grid">
      <div className="equal width row">{renderedPosts}</div>
    </div>
  );
};

export default PostList;
