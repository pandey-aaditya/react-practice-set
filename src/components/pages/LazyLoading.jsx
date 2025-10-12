import React, { Suspense } from "react";
import LoadingFallback from "../common/LoadingFallback";

const ComponentOne = React.lazy(() => import("./Debouncing"));
const ComponentTwo = React.lazy(() => import("./Polling"));

const LazyLoading = () => {
  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <ComponentOne />
        <ComponentTwo />
      </Suspense>
    </div>
  );
};

export default LazyLoading;
