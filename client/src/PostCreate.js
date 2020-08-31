import React, { useEffect, useState } from "react";
import axios from 'axios'


const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async(e) => {
      e.preventDefault();
      await axios.post('http://posts.com/posts/create',
      {title});
      setTitle('');
  }

  return (
    <form className="ui form" onSubmit={onSubmit}>
      <div className="field">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <button type="submit" className="ui button large primary">
        Submit
      </button>
    </form>
  );
};

export default PostCreate;
