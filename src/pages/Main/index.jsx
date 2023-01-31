import React from "react";
import { Switch, Route } from "react-router-dom";
import { TopHeader, Header, Footer } from "modules";
import { Home, About } from "pages";

const Main = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/about" render={() => <About />} />
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
