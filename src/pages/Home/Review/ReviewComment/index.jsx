import React from "react";
import { userCommentIcon } from "assets/images";

const ReviewComment = ({ description, image, name, surname, job }) => {
  return (
    <div className="review__comment">
      <div className="review__comment-text">
        <p>{description}</p>
      </div>
      <div className="review__comment-user">
        <div className="review__comment-img">
          <img src={image} alt="user" />
          <img src={userCommentIcon} alt="user-icon" />
        </div>
        <div className="review__comment-info">
          <h4>{`${name} ${surname}`}</h4>
          <p>{job}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewComment;
