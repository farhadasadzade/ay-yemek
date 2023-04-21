import { Switch, Route, Redirect } from "react-router-dom";
import { Main, Register, Login, Payment, Profile } from "pages";

function App() {
  return (
    <Switch>
      <Route path="/home" render={(props) => <Main {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/payment" render={(props) => <Payment {...props} />} />
      <Route path="/profile" render={(props) => <Profile {...props} />} />
      <Redirect to="/home" />
    </Switch>
  );
}

export default App;
