import React, { Suspense } from "react";

const DoTabs = React.lazy(() => import("./Tabs"));

const Team = () => {
  return (
    <Suspense fallback={<div></div>}>
      <DoTabs />
    </Suspense>
  );
};

export default Team;
