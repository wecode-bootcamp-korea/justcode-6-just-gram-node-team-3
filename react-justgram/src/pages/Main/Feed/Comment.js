import React, { useState, useEffect } from "react";
import "../Feed/Comment.scss";

const Comment = (props) => {
  const { commentArr, feedUniqueId, setCommentArr, setNumOfComment } = props;
  const onDelete = (e) => {
    const id = Number(e.target.dataset.id);
    const newCommentArr = commentArr.filter((comment) => id !== comment.id);
    setCommentArr(newCommentArr);
    setNumOfComment((current) => current - 1);
  };

  return (
    <ul className="comment-text-box">
      {commentArr.map((comment) => {
        const { id, feedId, userId, content, createAt } = comment;
        if (feedUniqueId === feedId) {
          return (
            <li key={id}>
              <span>{userId}</span>
              {content}
              <button data-id={id} onClick={onDelete}>
                X
              </button>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Comment;
