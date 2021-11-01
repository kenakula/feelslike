import * as React from 'react';
import TechnicalIssues from '../../components/TechnicalIssues/TechnicalIssues';
import Layout from '../../containers/layout/layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <TechnicalIssues
        code={404}
        header="Извините"
        message="Страница не найдена"
      />
    </Layout>
  );
};

export default NotFoundPage;
