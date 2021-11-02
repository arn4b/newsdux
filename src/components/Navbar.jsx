import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { TextField } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { selectSignedin, selectUserData, setUserData, setSignedIn, setSearchInput } from '../features/userSlice';

import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";


async function onLogout() {

  await signOut();
  window.location.href = "/";
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Raleway',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {

  const [inputValue, setInputValue] = useState("tech")
  const isSignedIn = useSelector(selectSignedin)
  const userData = useSelector(selectUserData)

  const dispatch = useDispatch()

  function handleSearch() {
    dispatch(setSearchInput(inputValue))
  }

  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {
            isSignedIn

              ?
              <>
                <TextField id="outlined-basic" label="Search" variant="outlined" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

                <Button variant="contained" onClick={handleSearch}>Search</Button>
              </>


              :

              <></>
          }
          <Typography variant="h6" className={classes.title}>
            React-Redux Blogger
          </Typography>
          {
            isSignedIn

              ?
              <>
                <Typography variant="h6" className={classes.title}>
                  Hello {userData}
                </Typography>
                <Button variant="contained" onClick={onLogout}>LogOut</Button>
              </>


              :

              <Button variant="contained" href="/login">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}
