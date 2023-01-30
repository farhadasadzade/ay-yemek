import React from "react";
import { map } from "lodash";

const CarouselPagination = ({ pages, activePage }) => {
  return (
    <div className="review__comment-pagination">
      {map(pages, (page) => (
        <div
          className={`review__comment-dot ${
            activePage === page ? "review__comment-dot-active" : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

export default CarouselPagination;
