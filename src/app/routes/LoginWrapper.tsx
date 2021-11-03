import TechnicalIssues from 'app/components/TechnicalIssues/TechnicalIssues';
import ThreeBounce from 'app/components/ThreeBounce/ThreeBounce';
import { BootState } from 'app/constants/boot-state';
// import LoginPage from 'app/pages/LoginPage/LoginPage';
import { LoginPageStoreContext } from 'app/stores/login-page/loginPageStore';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const LoginWrapper = observer((props: Props) => {
  const loginStore = useContext(LoginPageStoreContext);
  const [bootState, setBootState] = useState<BootState>(BootState.Loading);

  useEffect(() => {
    loginStore?.init();
  }, [loginStore]);

  useEffect(() => {
    if (loginStore?.isAuthorized) {
      console.log('success');
      setBootState(BootState.Success);
    }
  }, [loginStore?.isAuthorized]);

  // const history = useHistory();

  if (bootState === BootState.Success) {
    switch (loginStore?.isAuthorized) {
      case true:
        return props.children;
      case false:
        // history.push('/login');
        return <Redirect to="/login" />;
      default:
        return <TechnicalIssues />;
    }
  } else {
    return <ThreeBounce />;
  }
});

export default LoginWrapper;
