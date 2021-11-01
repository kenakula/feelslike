import * as React from 'react';
import { observer } from 'mobx-react-lite';
import TechnicalIssues from '../../components/TechnicalIssues/TechnicalIssues';
import Layout from '../../containers/layout/layout';

const ForbiddenPage = observer(() => (
  <Layout>
    <TechnicalIssues
      code={423}
      header="Ваша учетная запись заблокирована"
      message="Обратитесь в службу поддержки"
    />
  </Layout>
));

export default ForbiddenPage;
