import React from "react";
import Intro from "./Intro";
import Categories from "./Categories";
import HowWorks from "./HowWorks";
import FavoriteFoods from "./FavoriteFood";
import Review from "./Review";

const Home = () => {
  return (
    <>
      <Intro />
      <Categories />
      <HowWorks />
      <FavoriteFoods />
      <Review />
    </>
  );
};

export default Home;
