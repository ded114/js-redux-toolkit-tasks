import React from 'react';
import { useSelector } from 'react-redux';

const Comment = ({ commentId }) => {
  // BEGIN (write your solution here)
  const {comment, author} = useSelector((state) => {
    const comment = state.commentsReducer.comments.find((comm) => comm.id === commentId)
    const author = state.usersReducer.users.find((us) => us.id === comment?.author)
    return {comment, author}
    })
  // END

  if (!author || !comment) {
    return null;
  }

  return (
    <>
      <h5 className="card-title">{ author.name }</h5>
      <p className="card-text">{ comment.text }</p>
    </>
  );
};

export default Comment;
