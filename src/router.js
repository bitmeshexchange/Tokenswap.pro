import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from './routers';

function RouterConfig({ history, app }) {
  const routerConfig = getRouterData(app);
  const routes = [];
  routerConfig.map(item => {
    routes.push(<Route exact path={item.path} key={item.path} component={item.component} />);
  })

  return (
    <Router history={history}>
      <Switch>
          {routes}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
