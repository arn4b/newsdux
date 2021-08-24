const express = require('express')
const app = express()
const port = 3002

let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let {Google, Github, Facebook} = ThirdPartyEmailPassword;

let cors = require("cors");

require('dotenv').config()

supertokens.init({
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
        apiKey: process.env.SUPERTOKENS_API_KEY
    },
    appInfo: {
        // learn more about this on https://supertokens.io/docs/thirdpartyemailpassword/appinfo
        appName: "React redux blogger",
        apiDomain: "localhost:3002",
        websiteDomain: "localhost:3000",
        websiteBasePath: "/login"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            override: {
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        signInUpPOST: async (input) => {
                            // First we call the original implementation of signInUpPOST.
                            let response = await originalImplementation.signInUpPOST(input);

                            // Post sign up response, we check if it was successful
                            if (response.status === "OK") {

                                let { id, email } = response.user;

                                // Then we check if the user signed up using email / password or a third party login provider.
                                if (response.type === "thirdparty") {
                                    // This is the response from the OAuth 2 provider that contains their tokens or user info.
                                    let thirdPartyAuthCodeResponse = response.authCodeResponse;
                                    console.log(thirdPartyAuthCodeResponse)
                                }
                                if (input.type === "emailpassword") {
                                    // These are the input form fields values that the user used while signing up / in
                                    let formFields = input.formFields;
                                    console.log(formFields)
                                }

                                if (response.createdNewUser) {
                                    // TODO: Post sign up logic
                                } else {
                                    // TODO: Post sign in logic
                                }
                            }
                            return response;
                        }
                    }
                }
            },
            signUpFeature: {
                formFields: [{
                  id: "name"
                }]
            },
            providers: [
                Google({
                    clientSecret: "GOOGLE_CLIENT_SECRET",
                    clientId: "GOOGLE_CLIENT_ID"
                }),
                Github({
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    clientId: process.env.GITHUB_CLIENT_ID
                })
            ]
        }),
        Session.init() // initializes session features
    ]
});

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders() ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true, 
}));

app.use(supertokens.middleware());

app.use(supertokens.errorHandler())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
