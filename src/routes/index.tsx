import { Error404 } from 'components/molecules/Error404';
import { ErrorBoundary } from 'components/molecules/ErrorBoundary';
import Loading from 'components/molecules/Loading';
import Main from 'components/templates/Main';
import { AuthRouteGuard } from 'guards/AuthRouteGuard';
import Login from 'pages/Login';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { IRouteConfig, pageRoutes } from './routes';

const renderRoute = (routes: IRouteConfig[]) => {
  return routes.map((route) => {
    const {
      title,
      path,
      exact,
      component: Component,
      disableHeader = false,
      isBack = false,
    } = route;
    return (
      <Route key={path} path={path} exact={exact}>
        <Helmet>
          <title>{title || 'T Movies'}</title>
        </Helmet>
        <Main disableHeader={disableHeader} isBack={isBack}>
          <ErrorBoundary>{Component ? <Component /> : <Error404 />}</ErrorBoundary>
        </Main>
      </Route>
    );
  });
};

const Routes = () => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>{'T Movies'}</title>
      </Helmet>
      <Suspense fallback={<Loading isLoading={true} />}>
        <Switch>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/">
            <AuthRouteGuard>{renderRoute(pageRoutes)}</AuthRouteGuard>
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export * from './routes';
export default Routes;
