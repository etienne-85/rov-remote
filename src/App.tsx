import React from "react";
import { BrowserRouter as Router, useLocation, Route } from "react-router-dom";
import Tool from "./Tool";
import "./App.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// App args definitions
const URL_ARGS: any = {
  remoteUrl: "sample.txt"
};

/**
 * entry point
 */
export default () => {
  return (
    <>
      <Router basename="/">
        {/* <Route path="/" component={App} /> */}
        {/* <Switch> */}
        <Route exact path="/">
          <ProcessArgs />
        </Route>
        {/* <LoadSample sample={sample} /> */}
        {/* <Route exact path="/:sample" component={LoadSample} />
          <Route path="/:sample/:caseId" component={LoadSample} /> */}
        {/* </Switch> */}
      </Router>
    </>
  );
};

/**
 * Launch app
 */
const ProcessArgs = ({ match }: any) => {
  let query = useQuery();

  // check for provided url params to prefill app args
  Object.keys(URL_ARGS).forEach((argName: string) => {
    const urlArgVal = query.get(argName);
    if (urlArgVal && urlArgVal !== "") URL_ARGS[argName] = urlArgVal;
  });

  const args = { ...URL_ARGS };

  return <Tool args={args} />;
};
