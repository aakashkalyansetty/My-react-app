import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, HashRouter, Redirect } from "react-router-dom";

function Hello() {
  const allTabs = ['/', '/tab2', '/tab3'];

  return (
    <HashRouter>
      <div className="App">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Tabs value={location.pathname}>
                <Tab label="Item One" value="/" component={Link} to={allTabs[0]} />
                <Tab label="Item Two" value="/tab2" component={Link} to={allTabs[1]} />
                <Tab
                  value="/tab3"
                  label="Item Three"
                  component={Link}
                  to={allTabs[2]}
                />
              </Tabs>
              <Switch>
                <Route path={allTabs[1]} render={() => <div>Tab 2 <input type="text" placeholder="hello"/></div>} />
                <Route path={allTabs[2]} render={() => <div>Tab 3 <input/></div>} />
                <Route path={allTabs[0]} render={() => <div>Tab 1 <input/></div>} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </HashRouter>
  );
}

export default Hello;