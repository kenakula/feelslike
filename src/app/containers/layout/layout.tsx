import * as React from "react";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = (props: ILayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
