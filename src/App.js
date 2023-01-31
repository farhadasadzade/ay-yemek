import { Switch, Route } from "react-router-dom";
import { Main } from "pages";

function App() {
  return (
    <Switch>
      <Route path="/" render={() => <Main />} />
    </Switch>
  );
}

export default App;
