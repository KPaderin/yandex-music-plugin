import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useState} from "react";
import React from 'react';
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";

const Main = React.lazy(() => import("./pages/Main/Main"));
const Result = React.lazy(() => import("./pages/Result/Result"));

function App() {
  const [filesSelected, setFilesSelected] = useState();

  const main = () => {
      return <React.Suspense fallback={<LoadingComponent />}>
          <Main setFilesSelected={setFilesSelected} />
      </React.Suspense>
  }

  const result = () => {
        return <React.Suspense fallback={<LoadingComponent />}>
            <Result filesSelected={filesSelected}/>
        </React.Suspense>
  }

  return (
      <BrowserRouter>
          <Routes>
              <Route exact path={"/main"} element={main()} />
              <Route exact path={"/result"} element={result()} />
              <Route exact path={"/"} element={<Navigate replace to={"/main"} />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
