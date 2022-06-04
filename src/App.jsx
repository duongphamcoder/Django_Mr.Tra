import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { pages } from "./routers";

import { Fragment } from "react";

import DefaultLayout from "./views/defaultLayout";
import PrivatePage from "./views/privatePage";

function App() {
  console.log("App re-render");
  return (
    <Router>
      <div className="App">
        <Routes>
          {pages.map((route, index) => {
            // kiểm tra xem Component này thuộc private hay public
            const Wrapper = route.status === 0 ? Fragment : PrivatePage;
            // kiểm tra xem Component này có phải là Component con hay không;
            const WarapChildren = Boolean(route.childrenOf)
              ? route.childrenOf
              : Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    {
                      <Wrapper>
                        <WarapChildren>
                          <route.component></route.component>
                        </WarapChildren>
                      </Wrapper>
                    }
                  </DefaultLayout>
                }
              />
            );
          })}
          <Route
            path="*"
            element={
              <DefaultLayout>
                <h1>Err</h1>
              </DefaultLayout>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
