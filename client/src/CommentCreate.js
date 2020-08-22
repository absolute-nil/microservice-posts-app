import React, { useEffect, useState } from "react";
import axios from 'axios'

const CommentCreate = ({postId}) => {
  const [content, setContent] = useState("");

  const onSubmit = async(e) => {
      e.preventDefault();
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, 
      {content});
      setContent('');
  }

  return (
    <form className="ui form" onSubmit={onSubmit}>
      <div className="field">
        <label>New Comment</label>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
      </div>
      <button type="submit" className="ui button small primary">
        Submit
      </button>
    </form>
  );
};

export default CommentCreate;
