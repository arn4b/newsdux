import React from 'react'
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";



async function onLogout() {
    await signOut();
    window.location.href = "/";
}

export default function Homepage() {


    
    return (
        <div className="homepage">
            <div className="loginMsg">
                <h2>Hey</h2>
                <h1>Redux React Blog</h1>
                <h4>React redux apllication</h4>
                <li onClick={onLogout}>Logout</li>
            </div>
        </div>
    )
}
