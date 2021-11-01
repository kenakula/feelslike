import * as React from "react";
import { observer } from "mobx-react";
import Layout from "../../containers/layout/layout";

const LoginPage = observer((): JSX.Element => {
  // const loginPageStore = useLoginPageStore();
  // const passwordRef = React.useRef<HTMLElement>();

  return (
    <Layout>
      <div className="login">
        <span>Login Page</span>
      </div>
    </Layout>
  );
});

export default LoginPage;
