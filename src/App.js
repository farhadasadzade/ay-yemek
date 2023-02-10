import { Switch, Route, Redirect } from "react-router-dom";
import { Main, Register, Login, Payment } from "pages";

function App() {
  return (
    <Switch>
      <Route path="/home" render={(props) => <Main {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/payment" render={() => <Payment />} />
      <Redirect to="/home" />
    </Switch>
  );
}

export default App;
