import React from "react";
import { Switch, Route } from "react-router-dom";
import { TopHeader, Header, Footer } from "modules";
import { Home, About, Contact } from "pages";

const Main = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/about" render={() => <About />} />
        <Route path="/contact" render={() => <Contact />} />
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
