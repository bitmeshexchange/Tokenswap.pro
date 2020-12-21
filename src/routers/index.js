import dynamicWrapper from './dynamic';
import routes from './map';
import { Route } from 'dva/router';


function parseRoute(app, item) {
    let {children, path} = item;
    const mixin = null;
    if (children && children.length) {
      children = children.map(i => {
        const r = parseRoute(app, i);
        return <Route path={path + r.path} key={r.path} exact={r.exact !== false} component={r.component} />
      });
    }
  
    return {
      ...item,
      component: dynamicWrapper(app, item.models || [], item.component, {
        mixin,
        children,
      }),
    }
  }

export const getRouterData = app => {
    return routes.map(item => {
        // console.log(parseRoute);
        return parseRoute(app, item);
    })
}