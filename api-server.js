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
        websiteDomain: "localhost:3000"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
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
