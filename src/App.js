import { Switch, Route, Redirect } from "react-router-dom";
import { Main, Register } from "pages";

function App() {
  return (
    <Switch>
      <Route path="/home" render={(props) => <Main {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Redirect to="/home" />
    </Switch>
  );
}

export default App;
