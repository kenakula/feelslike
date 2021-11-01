import React from "react";
const Layout = React.lazy(() => import("../../containers/layout/layout"));

const JournalPage = () => {
  return (
    <Layout>
      <h1>Journal</h1>
    </Layout>
  );
};

export default JournalPage;
