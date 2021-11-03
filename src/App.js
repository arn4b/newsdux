import './App.css';
import Homepage from './components/Homepage'
import Login from './components/Login'
import Navbar from './components/Navbar'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import {  BrowserRouter as Router,  Switch,  Route,  Link} from "react-router-dom";

import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword, {Github, Google, ThirdPartyEmailPasswordAuth} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Landing from './components/Landing';
import { useSelector } from 'react-redux';
import { selectSignedin } from './features/userSlice';
import News from './components/News';

SuperTokens.init({
    appInfo: {
        appName: "NewsDux",
        apiDomain: "https://newsdux-backend.herokuapp.com/",
        websiteDomain: "localhost:3000",
        websiteBasePath: "/login"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
          getRedirectionURL: async (context) => {
            if (context.action === "SIGN_IN_AND_UP") {
                return "/login";
              };
              if (context.action === "SUCCESS") {
                if (context.redirectToPath !== undefined) {
                    return context.redirectToPath;
                }
                return "/home";
            }
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
              },
              style: {
                  container: {
                    background: "linear-gradient(135deg, rgba(0,0,0,1) 10%, rgba(255,141,0,1) 100%)",
                    marginTop: "4rem",
                  },
                  secondaryText: {
                    fontSize: "1rem",
                  },
                  link: {
                    fontSize: "1rem",
                  }
            }
            },
            palette: {
              background: '#000357',
              error: '#ad2e2e',
              textTitle: "white",
              textLabel: "white",
              textInput: '#000',
              textPrimary: "white",
              textLink: '#ff9b33'
          }
        }),
        Session.init()
    ]
});

const fetchData = () => {
  return axios.get("https://newsdux-backend.herokuapp.com/")
}

function App() {

  const isSignedin = useSelector(selectSignedin)

  const notify = () => toast("Wow so easy !", {
    position: toast.POSITION.BOTTOM_LEFT
  });

  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* <button onClick={notify}>Notify !</button> */}
        <ToastContainer />
        <Switch>
          {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

            <Route path="/" exact>
              <Landing />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/home">
                <ThirdPartyEmailPasswordAuth>
                  <Homepage />  

                  {isSignedin && <News />} 
                </ThirdPartyEmailPasswordAuth>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;