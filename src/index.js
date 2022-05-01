import React, { lazy, Suspense } from "react";
import "./style.css";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import Loading from "./modules/Loading";
const App = lazy(() => {
  return Promise.all([
    import("./App"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <Loading/>
      }
    >
    <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
