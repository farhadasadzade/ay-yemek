import React from "react";
import Intro from "./Intro";
import Categories from "./Categories";
import HowWorks from "./HowWorks";
import FavoriteFoods from "./FavoriteFood";
import Review from "./Review";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <>
      <Intro />
      <Categories />
      <HowWorks />
      <FavoriteFoods />
      <Review />
      <FAQ />
    </>
  );
};

export default Home;
