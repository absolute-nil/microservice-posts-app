import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {

    let content;

    switch (comment.status) {
      case "pending":
        content = "This comment is pending approval"
        break;
        case "approved":
          content = comment.content
          break;
        case "rejected":
          content = "This comment has been rejected"
          break;
      default:
        break;
    }

    return (
      <div className="item" key={comment.id}>
        {content}
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
