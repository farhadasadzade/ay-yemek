import React from "react";
import { userCommentIcon } from "assets/images";

const ReviewComment = ({ comment, userImg, userName, userInfo }) => {
  return (
    <div className="review__comment">
      <div className="review__comment-text">
        <p>{comment}</p>
      </div>
      <div className="review__comment-user">
        <div className="review__comment-img">
          <img src={userImg} alt="user" />
          <img src={userCommentIcon} alt="user-icon" />
        </div>
        <div className="review__comment-info">
          <h4>{userName}</h4>
          <p>{userInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewComment;
