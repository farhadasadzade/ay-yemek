import React from "react";
import { categoryShape } from "assets/images";

const Category = ({ image }) => {
  return (
    <div className="home__category">
      <div className="home__category-img">
        <img src={image} alt="category" />
        <img className="home__category-shape" src={categoryShape} alt="shape" />
      </div>
    </div>
  );
};

export default Category;
