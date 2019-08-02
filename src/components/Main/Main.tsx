import React from "react";
import SearchPanel from "../SearchPanel";
import Weather from "../Weather";

import "./Main.css";

const Main: React.SFC = () => {
  return (
    <div className="main-component">
      <header className="main-component__nav navbar navbar-dark">
        <a className="navbar-brand" href="#">
          Weather App
        </a>
      </header>
      <div className="main-component__content container">
        <SearchPanel />
        <hr className={"main-component-line"} />
        <Weather />
      </div>
      <footer className={"main-component__footer"}>
        <div> 2019 </div>
        <div className={"main-component__footer-links"}>
          <a href="https://github.com/alexbovt" target="_blank">
            <i className="fa fa-github" aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/oleksii-bovt/" target="_blank">
            <i className="fa fa-linkedin" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Main;
