import React from 'react'
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectSignedin, setSignedIn, setUserData } from '../features/userSlice';
import News from './News';

async function onLogout() {

    await signOut();
    window.location.href = "/";
}



export default function Homepage() {

    const isSignedIn = useSelector(selectSignedin)

    const dispatch = useDispatch()

    const notify = () => toast("Wow so easy !", {
        position: toast.POSITION.BOTTOM_LEFT
    });

    const { userId } = useSessionContext();

    function login() {
        console.log(userId)
        dispatch(setSignedIn(true))
        dispatch(setUserData(userId))
    }

    login()

    return (
        <div className="homepage">
            <div className="loginMsg">
            </div>
        </div>
    )
}
