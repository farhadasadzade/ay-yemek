import React from "react";
import { Routes, Route } from "react-router-dom";
import { TopHeader, Header } from "modules";
import { Home } from "pages";

const Main = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default Main;
