import React from 'react'
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { useSessionContext } from 'supertokens-auth-react/recipe/session';


async function onLogout() {
    await signOut();
    window.location.href = "/";
}



export default function Homepage(props) {

    const { userId } = useSessionContext();
    
    return (
        <div className="homepage">
            <div className="loginMsg">
                <h2>Hey <span style={{'color': 'red'}}>{userId}</span></h2>
                <h1>Redux React Blog</h1>
                <h4>React redux apllication</h4>
                <div onClick={onLogout}>Logout</div>
            </div>
        </div>
    )
}
