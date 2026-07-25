import { useLayoutEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./navigation/AppRoutes";
import "./index.css";
import "./App.css";

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollWrapper>
        <AppRoutes />
      </ScrollWrapper>
    </BrowserRouter>
  );
}

export default App;
