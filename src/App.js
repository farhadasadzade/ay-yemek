import { Switch, Route, Redirect } from "react-router-dom";
import { Main, Register, Login } from "pages";

function App() {
  return (
    <Switch>
      <Route path="/home" render={(props) => <Main {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Redirect to="/home" />
    </Switch>
  );
}

export default App;
