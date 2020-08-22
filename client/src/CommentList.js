import React from "react";

const CommentList = ({ comments }) => {

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
