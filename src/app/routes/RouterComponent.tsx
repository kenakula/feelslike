import JournalPage from "app/pages/JournalPage/JournalPage";
import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ThreeBounce from "../components/ThreeBounce/ThreeBounce";
import { Routes } from "./routes";

const ErrorPage = React.lazy(() => import("../pages/ErrorPage/ErrorPage"));
const NotFoundPage = React.lazy(
  () => import("../pages/NotFoundPage/NotFoundPage")
);
const ForbiddenPage = React.lazy(
  () => import("../pages/ForbiddenPage/ForbiddenPage")
);
const LoginPage = React.lazy(() => import("../pages/LoginPage/LoginPage"));
const MainPage = React.lazy(() => import("../pages/MainPage/MainPage"));

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Routes.FORBIDDEN}>
          <React.Suspense fallback={<ThreeBounce />}>
            <ForbiddenPage />
          </React.Suspense>
        </Route>

        <Route exact path={Routes.ERROR_PAGE}>
          <React.Suspense fallback={<ThreeBounce />}>
            <ErrorPage />
          </React.Suspense>
        </Route>

        <Route exact path={Routes.LOGIN}>
          <React.Suspense fallback={<ThreeBounce />}>
            <LoginPage />
          </React.Suspense>
        </Route>

        <Route exact path={Routes.DEFAULT}>
          <React.Suspense fallback={<ThreeBounce />}>
            <MainPage />
          </React.Suspense>
        </Route>

        <Route exact path={Routes.JOURNAL}>
          <React.Suspense fallback={<ThreeBounce />}>
            <JournalPage />
          </React.Suspense>
        </Route>

        <Route path="*">
          <React.Suspense fallback={<ThreeBounce />}>
            <NotFoundPage />
          </React.Suspense>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default RouterComponent;
