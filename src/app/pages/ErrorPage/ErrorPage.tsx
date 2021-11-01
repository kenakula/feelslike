import { observer } from "mobx-react";
import * as React from "react";
import TechnicalIssues from "app/components/TechnicalIssues/TechnicalIssues";
import Layout from "app/containers/layout/layout";

const ErrorPage = observer(() => (
  <Layout>
    <TechnicalIssues header="Извините" message="Произошла ошибка" />
  </Layout>
));

export default ErrorPage;
