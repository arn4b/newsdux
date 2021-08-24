import './App.css';
import Homepage from './components/Homepage'
import Login from './components/Login'
import Navbar from './components/Navbar'
import axios from "axios"


import React from 'react';
import {  BrowserRouter as Router,  Switch,  Route,  Link} from "react-router-dom";

import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword, {Github, Google, ThirdPartyEmailPasswordAuth} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "react Redux Blogger",
        apiDomain: "localhost:3002",
        websiteDomain: "localhost:3000",
        websiteBasePath: "/login"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
          getRedirectionURL: async (context) => {
            if (context.action === "SIGN_IN_AND_UP") {
                return "/login";
              };
          },
            signInAndUpFeature: {
              disableDefaultImplementation: true,
                providers: [
                    Github.init(),
                    Google.init(),
                ],
                signUpForm: {
                  formFields: [{
                      id: "name",
                      label: "Full name",
                      placeholder: "First name and last name"
                  }]
              }
            },
            palette: {
              background: '#000357',
              error: '#ad2e2e',
              textTitle: "white",
              textLabel: "white",
              textInput: '#a9a9a9',
              textPrimary: "white",
              textLink: '#a9a9a9'
          }
        }),
        Session.init()
    ]
});

SuperTokens.init({
  recipeList: [
      ThirdPartyEmailPassword.init({

          // The user will be taken to the custom path when then need to login.
          getRedirectionURL: async (context) => {
              if (context.action === "SIGN_IN_AND_UP") {
                  return "/login";
              };
          }
      })
  ]
})

const fetchData = () => {
  return axios.get("localhost:3002/")
}

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
                <ThirdPartyEmailPasswordAuth>
                  <Homepage />                  
                </ThirdPartyEmailPasswordAuth>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;