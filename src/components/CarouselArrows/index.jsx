import React from "react";
import "./style/index.scss";

const ArrowLeft = ({ stroke }) => {
  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.19329 7.2119L15.2744 7.2119"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.87244 1.55653L1.19305 7.21151L6.87244 12.8674"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const ArrowRight = ({ stroke }) => {
  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.802 7.21117L1.72083 7.21117"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.1228 1.5558L15.8022 7.21078L10.1228 12.8667"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const CarouselArrows = ({ type, onClick }) => {
  return (
    <div className="carousel__controls">
      {type === "NEXT" ? (
        <button onClick={onClick}>
          <ArrowRight stroke="black" />
        </button>
      ) : (
        <button onClick={onClick}>
          <ArrowLeft stroke="black" />
        </button>
      )}
    </div>
  );
};

export default CarouselArrows;
