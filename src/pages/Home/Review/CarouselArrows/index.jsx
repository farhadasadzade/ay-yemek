import React from "react";

const ArrowLeft = () => {
  return (
    <svg
      width="28"
      height="12"
      viewBox="0 0 28 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M5.99996 11.3334V7.33342H27.3333V4.66675H5.99996V0.666748L0.666626 6.00008L5.99996 11.3334Z"
        fill="#172A14"
      />
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <svg
      width="28"
      height="12"
      viewBox="0 0 28 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.0001 0.666504V4.6665H0.666748V7.33317H22.0001V11.3332L27.3334 5.99984L22.0001 0.666504Z"
        fill="#172A14"
        opacity="0.5"
      />
    </svg>
  );
};

const CarouselArrows = ({ type, onClick }) => {
  return (
    <div className="review__comment-controls">
      {type === "NEXT" ? (
        <button onClick={onClick}>
          <ArrowRight />
        </button>
      ) : (
        <button onClick={onClick}>
          <ArrowLeft />
        </button>
      )}
    </div>
  );
};

export default CarouselArrows;
