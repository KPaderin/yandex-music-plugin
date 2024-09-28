import React, {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";

const Main = React.lazy(() => import("./pages/Main/Main"));
const Result = React.lazy(() => import("./pages/Result/Result"));
const Login = React.lazy(() => import("./pages/Login/Login"));

function App() {
  const [filesSelected, setFilesSelected] = useState();

    const login = () => {
        if (localStorage.getItem('token') !== null)
            return <Navigate replace to={"/main"} />

        return <React.Suspense fallback={<LoadingComponent />}>
            <Login />
        </React.Suspense>
    }

  const main = () => {
      if (localStorage.getItem('token') === null)
          return <Navigate replace to={"/login"} />
      return <React.Suspense fallback={<LoadingComponent />}>
          <Main setFilesSelected={setFilesSelected} />
      </React.Suspense>
  }

  const result = () => {
      if(filesSelected === undefined)
          return <Navigate replace to={"/main"} />

      return <React.Suspense fallback={<LoadingComponent />}>
          <Result filesSelected={filesSelected}/>
      </React.Suspense>
  }

  return (
      <BrowserRouter>
          <Routes>
              <Route exact path={"/login"} element={login()} />
              <Route exact path={"/main"} element={main()} />
              <Route exact path={"/result"} element={result()} />
              <Route exact path={"/"} element={<Navigate replace to={"/main"} />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
