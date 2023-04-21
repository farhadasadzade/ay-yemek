import React from "react";
import { Switch, Route } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import PaymentSuccess from "./PaymentSuccess";

const Payment = ({ match: { url } }) => {
  return (
    <Switch>
      <Route
        path={`${url}`}
        exact
        render={(props) => <PaymentPage {...props} />}
      />
      <Route
        path={`${url}/approve`}
        render={(props) => <PaymentSuccess {...props} />}
      />
      <Route
        path={`${url}/cancel`}
        render={(props) => <PaymentPage {...props} />}
      />
      <Route
        path={`${url}/decline`}
        render={(props) => <PaymentPage {...props} />}
      />
    </Switch>
  );
};

export default Payment;
