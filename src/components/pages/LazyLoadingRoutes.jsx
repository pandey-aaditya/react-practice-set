import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoadingFallback from "../common/LoadingFallback";

const DebouncingComponent = React.lazy(() => import("./Debouncing"));
const PollingComponent = React.lazy(() => import("./Polling"));

const LazyLoadingRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/debounce"} replace />} />
          <Route path="/debounce" element={<DebouncingComponent />} />
          <Route path="/polling" element={<PollingComponent />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default LazyLoadingRoutes;
