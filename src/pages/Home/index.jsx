import React from "react";
import Intro from "./Intro";
import Categories from "./Categories";
import HowWorks from "./HowWorks";
import FavoriteFoods from "./FavoriteFood";

const Home = () => {
  return (
    <>
      <Intro />
      <Categories />
      <HowWorks />
      <FavoriteFoods />
    </>
  );
};

export default Home;
