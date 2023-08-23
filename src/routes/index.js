import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "routes/routes";
import RouteAuthProvider from "auth/RouteAuthProvider";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component, isProtected }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <RouteAuthProvider isProtected={isProtected}>
                <Component />
              </RouteAuthProvider>
            }
          ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};
