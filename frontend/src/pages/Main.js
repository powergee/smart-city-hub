import React from "react";
import { Route, Switch } from "react-router-dom";
import { NavigationBar, NotFound } from "../components";
import {
  Home,
  Login,
  Register,
  Introduction,
  Projects,
  Publish,
  Hub,
  News,
  Community,
  Solution,
  SolutionManager,
  Asean,
} from ".";
import "./Main.scss";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import logo from "../images/footer-logo.png";
import { useTranslation } from "react-i18next";

export default function Main() {
  const [t] = useTranslation();

  return (
    <div>
      <NavigationBar />
      <div className="main-body">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route path="/introduction" component={Introduction}></Route>
          <Route path="/publish" component={Publish}></Route>
          <Route path="/news" component={News}></Route>
          <Route path="/community" component={Community}></Route>
          <Route path="/projects" component={Projects}></Route>
          <Route path="/hub" component={Hub}></Route>
          <Route path="/solution" component={Solution}></Route>
          <Route path="/solution-manager" component={SolutionManager}></Route>
          <Route path="/asean" component={Asean}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </div>
      <footer className="main-footer">
        <div className="main-footer-content">
          <p>{t("labAddress")}</p>
          <p>
            <PhoneIcon className="footer-icon" />
            Tel : +82-2-6490-5154
          </p>
          <p>
            <PhoneAndroidIcon className="footer-icon" />
            CP : +82-10-2969-2504
          </p>
          <p>
            <MailOutlineIcon className="footer-icon" />
            Email : chunhoy7@uos.ac.kr
          </p>
          <strong>
            Copyright 2021 Global Urban &#38; Infrastructure Research Center.
            All Rights Reserved.
          </strong>
        </div>
        <div>
          <img className="footer-image" src={logo} alt="footer logo"></img>
        </div>
      </footer>
    </div>
  );
}
