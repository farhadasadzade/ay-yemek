import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { TopHeader, Header, Footer } from "modules";
import { Home, About, Contact, Categories } from "pages";

const Main = ({ match: { url } }) => {
  return (
    <>
      <TopHeader />
      <Header />
      <Switch>
        <Route path={`${url}`} exact render={() => <Home />} />
        <Route path={`${url}/about`} render={() => <About />} />
        <Route path={`${url}/contact`} render={() => <Contact />} />
        <Route path={`${url}/categories`} render={() => <Categories />} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
